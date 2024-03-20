import { IRoomPetData, IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetInfoUpdateEvent extends RoomSessionEvent
{
    public static PET_INFO: string = 'RSPIUE_PET_INFO';

    private _petInfo: IRoomPetData;

    constructor(k: IRoomSession, _arg_2: IRoomPetData)
    {
        super(RoomSessionPetInfoUpdateEvent.PET_INFO, k);

        this._petInfo = _arg_2;
    }

    public get petInfo(): IRoomPetData
    {
        return this._petInfo;
    }
}
