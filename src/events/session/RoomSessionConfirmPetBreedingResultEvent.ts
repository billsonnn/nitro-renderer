import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionConfirmPetBreedingResultEvent extends RoomSessionEvent
{
    public static RSPFUE_CONFIRM_PET_BREEDING_RESULT: string = 'RSPFUE_CONFIRM_PET_BREEDING_RESULT';

    private _breedingNestStuffId: number;
    private _result: number;

    constructor(session: IRoomSession, breedingNestStuffId: number, result: number)
    {
        super(RoomSessionConfirmPetBreedingResultEvent.RSPFUE_CONFIRM_PET_BREEDING_RESULT, session);

        this._breedingNestStuffId = breedingNestStuffId;
        this._result = result;
    }

    public get breedingNestStuffId(): number
    {
        return this._breedingNestStuffId;
    }

    public get result(): number
    {
        return this._result;
    }
}
