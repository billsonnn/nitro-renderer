import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionConfirmPetBreedingResultEvent extends RoomSessionEvent
{
    public static RSPFUE_CONFIRM_PET_BREEDING_RESULT: string = 'RSPFUE_CONFIRM_PET_BREEDING_RESULT';

    private _breedingNestStuffId: number;
    private _result: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: number)
    {
        super(RoomSessionConfirmPetBreedingResultEvent.RSPFUE_CONFIRM_PET_BREEDING_RESULT, k);

        this._breedingNestStuffId = _arg_2;
        this._result = _arg_3;
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
