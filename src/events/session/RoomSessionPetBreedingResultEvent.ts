import { IPetBreedingResultData, IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingResultEvent extends RoomSessionEvent
{
    public static PET_BREEDING_RESULT: string = 'RSPFUE_PET_BREEDING_RESULT';

    private _resultData: IPetBreedingResultData;
    private _otherResultData: IPetBreedingResultData;

    constructor(k: IRoomSession, _arg_2: IPetBreedingResultData, _arg_3: IPetBreedingResultData)
    {
        super(RoomSessionPetBreedingResultEvent.PET_BREEDING_RESULT, k);

        this._resultData = _arg_2;
        this._otherResultData = _arg_3;
    }

    public get resultData(): IPetBreedingResultData
    {
        return this._resultData;
    }

    public get otherResultData(): IPetBreedingResultData
    {
        return this._otherResultData;
    }
}
