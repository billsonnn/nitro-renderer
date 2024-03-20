import { IAssetData, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectSamplePlaybackEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureSoundBlockLogic extends FurnitureMultiStateLogic
{
    private static HIGHEST_SEMITONE: number = 12;
    private static LOWEST_SEMITONE: number = -12;
    private static STATE_UNINITIALIZED: number = -1;

    private _state: number = -1;
    private _sampleId: number = -1;
    private _noPitch: boolean = false;
    private _lastLocZ: number = 0;

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED,
            RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED,
            RoomObjectSamplePlaybackEvent.PLAY_SAMPLE,
            RoomObjectSamplePlaybackEvent.CHANGE_PITCH
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.logic)
        {
            if(asset.logic.soundSample)
            {
                this._sampleId = asset.logic.soundSample.id;
                this._noPitch = asset.logic.soundSample.noPitch;
            }
        }

        this.object.model.setValue(RoomObjectVariable.FURNITURE_SOUNDBLOCK_RELATIVE_ANIMATION_SPEED, 1);
    }

    public dispose(): void
    {
        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED, this.object, this._sampleId));
        }

        super.dispose();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage) this.updateSoundBlockMessage(message);
    }

    private updateSoundBlockMessage(message: ObjectDataUpdateMessage): void
    {
        if(!message) return;

        const model = this.object && this.object.model;
        const location = this.object && this.object.location;

        if(!model || !location) return;

        if(this._state === FurnitureSoundBlockLogic.STATE_UNINITIALIZED && model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            this._lastLocZ = location.z;
            this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED, this.object, this._sampleId, this.getPitchForHeight(location.z)));
        }

        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED && model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            if(this._lastLocZ !== location.z)
            {
                this._lastLocZ = location.z;
                this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.CHANGE_PITCH, this.object, this._sampleId, this.getPitchForHeight(location.z)));
            }

        }

        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED && message.state !== this._state)
        {
            this.playSoundAt(location.z);
        }

        this._state = message.state;
    }

    private playSoundAt(height: number): void
    {
        if(!this.object) return;

        const pitch: number = this.getPitchForHeight(height);

        this.object.model.setValue(RoomObjectVariable.FURNITURE_SOUNDBLOCK_RELATIVE_ANIMATION_SPEED, pitch);

        this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.PLAY_SAMPLE, this.object, this._sampleId, pitch));
    }

    private getPitchForHeight(height: number): number
    {
        if(this._noPitch) return 1;

        let heightScaled: number = (height * 2);

        if(heightScaled > FurnitureSoundBlockLogic.HIGHEST_SEMITONE)
        {
            heightScaled = Math.min(0, (FurnitureSoundBlockLogic.LOWEST_SEMITONE + ((heightScaled - FurnitureSoundBlockLogic.HIGHEST_SEMITONE) - 1)));
        }

        return Math.pow(2, (heightScaled / 12));
    }
}
