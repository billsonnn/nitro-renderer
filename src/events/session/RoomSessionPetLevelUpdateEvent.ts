import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetLevelUpdateEvent extends RoomSessionEvent
{
    public static PET_LEVEL_UPDATE: string = 'RSPLUE_PET_LEVEL_UPDATE';

    private _petId: number;
    private _level: number;

    constructor(session: IRoomSession, petId: number, level: number)
    {
        super(RoomSessionPetLevelUpdateEvent.PET_LEVEL_UPDATE, session);

        this._petId = petId;
        this._level = level;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get level(): number
    {
        return this._level;
    }
}
