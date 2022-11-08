import { RoomObjectPlaySoundIdEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureCuckooClockLogic extends FurnitureMultiStateLogic
{
    private _state: number = 1;

    public getEventTypes(): string[]
    {
        const types = [RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            if((this._state !== -1) && (message.state !== this._state))
            {
                this.dispatchSoundEvent(this.object.location.z);
            }

            this._state = message.state;
        }
    }

    private dispatchSoundEvent(height: number): void
    {
        const pitch = Math.pow(2, (height - 1.2));

        this.eventDispatcher.dispatchEvent(new RoomObjectPlaySoundIdEvent(RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH, this.object, 'FURNITURE_cuckoo_clock', pitch));
    }
}
