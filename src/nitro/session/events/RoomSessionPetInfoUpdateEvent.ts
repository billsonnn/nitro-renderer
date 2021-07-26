import { IRoomSession } from '../IRoomSession';
import { RoomPetData } from '../RoomPetData';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetInfoUpdateEvent extends RoomSessionEvent
{
    public static PET_INFO: string = 'RSPIUE_PET_INFO';

    private _petInfo: RoomPetData;

    constructor(k: IRoomSession, _arg_2: RoomPetData)
    {
        super(RoomSessionPetInfoUpdateEvent.PET_INFO, k);

        this._petInfo = _arg_2;
    }

    public get petInfo():RoomPetData
    {
        return this._petInfo;
    }
}
