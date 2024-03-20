import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingEvent extends RoomSessionEvent
{
    public static PET_BREEDING: string = 'RSPFUE_PET_BREEDING';

    private _state: number;
    private _ownPetId: number;
    private _otherPetId: number;

    constructor(session: IRoomSession, state: number, ownPetId: number, otherPetId: number)
    {
        super(RoomSessionPetBreedingEvent.PET_BREEDING, session);

        this._state = state;
        this._ownPetId = ownPetId;
        this._otherPetId = otherPetId;
    }

    public get state(): number
    {
        return this._state;
    }

    public get ownPetId(): number
    {
        return this._ownPetId;
    }

    public get otherPetId(): number
    {
        return this._otherPetId;
    }
}
