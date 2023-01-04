import { IPetBreedingResultData, IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingResultEvent extends RoomSessionEvent
{
    public static PET_BREEDING_RESULT: string = 'RSPFUE_PET_BREEDING_RESULT';

    private _resultData: IPetBreedingResultData;
    private _otherResultData: IPetBreedingResultData;

    constructor(session: IRoomSession, resultData: IPetBreedingResultData, otherResultData: IPetBreedingResultData)
    {
        super(RoomSessionPetBreedingResultEvent.PET_BREEDING_RESULT, session);

        this._resultData = resultData;
        this._otherResultData = otherResultData;
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
