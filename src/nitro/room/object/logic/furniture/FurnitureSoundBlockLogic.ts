import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { RoomObjectSamplePlaybackEvent } from '../../../events/RoomObjectSamplePlaybackEvent';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureSoundBlockLogic extends FurnitureMultiStateLogic
{
    private static HIGHEST_SEMITONE: number = 12;
    private static LOWEST_SEMITONE: number = -12;
    private static STATE_UNINITIALIZED: number = -1;

    private _state: number;
    private _sampleId: number;
    private _noPitch: boolean;
    private _lastLocZ: number;

    constructor()
    {
        super();

        this._state     = -1;
        this._sampleId  = -1;
        this._noPitch   = false;
        this._lastLocZ  = 0;
    }

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

        if(!asset.soundSample) return;

        this._sampleId = asset.soundSample;
        this.updateModel();
    }

    public dispose(): void
    {
        super.dispose();

        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED, this.object, this._sampleId));
        }
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
            this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED, this.object, this._sampleId, this._Str_17428(location.z)));
        }

        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED && model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            if(this._lastLocZ !== location.z)
            {
                this._lastLocZ = location.z;
                this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.CHANGE_PITCH, this.object, this._sampleId, this._Str_17428(location.z)));
            }

        }

        if(this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED && message.state !== this._state)
        {
            this._Str_18183(location.z);
        }

        this._state = message.state;
    }

    protected updateModel(): boolean
    {
        const model = this.object && this.object.model;

        if(!model) return false;

        model.setValue(RoomObjectVariable.FURNITURE_SOUNDBLOCK_RELATIVE_ANIMATION_SPEED, 1);
    }

    private _Str_18183(k: number): void
    {
        const model = this.object && this.object.model;

        if(!model) return;

        const _local_2: number = this._Str_17428(k);

        model.setValue(RoomObjectVariable.FURNITURE_SOUNDBLOCK_RELATIVE_ANIMATION_SPEED, _local_2);
        this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent(RoomObjectSamplePlaybackEvent.PLAY_SAMPLE, this.object, this._sampleId, _local_2));
    }

    private _Str_17428(k: number): number
    {
        let _local_2: number = (k * 2);
        if(_local_2 > FurnitureSoundBlockLogic.HIGHEST_SEMITONE)
        {
            _local_2 = Math.min(0, (FurnitureSoundBlockLogic.LOWEST_SEMITONE + ((_local_2 - FurnitureSoundBlockLogic.HIGHEST_SEMITONE) - 1)));
        }
        return (this._noPitch) ? 1 : Math.pow(2, (_local_2 / 12));
    }
}
