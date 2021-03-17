import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetLevelUpdateEvent extends RoomSessionEvent
{
    public static RSPLUE_PET_LEVEL_UPDATE: string = 'RSPLUE_PET_LEVEL_UPDATE';

    private _petId: number;
    private _level: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: number)
    {
        super(RoomSessionPetLevelUpdateEvent.RSPLUE_PET_LEVEL_UPDATE, k);

        this._petId = _arg_2;
        this._level = _arg_3;
    }

    public get _Str_2508(): number
    {
        return this._petId;
    }

    public get level(): number
    {
        return this._level;
    }
}