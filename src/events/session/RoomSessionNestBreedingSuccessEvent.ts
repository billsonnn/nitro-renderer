import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionNestBreedingSuccessEvent extends RoomSessionEvent
{
    public static NEST_BREEDING_SUCCESS: string = 'RSPFUE_NEST_BREEDING_SUCCESS';

    private _rarityCategory: number;
    private _petId: number;

    constructor(session: IRoomSession, petId: number, rarityCategory: number)
    {
        super(RoomSessionNestBreedingSuccessEvent.NEST_BREEDING_SUCCESS, session);

        this._petId = petId;
        this._rarityCategory = rarityCategory;
    }

    public get rarityCategory(): number
    {
        return this._rarityCategory;
    }

    public get petId(): number
    {
        return this._petId;
    }
}
