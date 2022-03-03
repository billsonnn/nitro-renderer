import { PetBreedingResultData } from '../../communication/messages/incoming/room/pet/PetBreedingResultData';
import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingResultEvent extends RoomSessionEvent
{
    public static PET_BREEDING_RESULT: string = 'RSPFUE_PET_BREEDING_RESULT';

    private _resultData: PetBreedingResultData;
    private _otherResultData: PetBreedingResultData;

    constructor(k: IRoomSession, _arg_2: PetBreedingResultData, _arg_3: PetBreedingResultData)
    {
        super(RoomSessionPetBreedingResultEvent.PET_BREEDING_RESULT, k);

        this._resultData = _arg_2;
        this._otherResultData = _arg_3;
    }

    public get resultData(): PetBreedingResultData
    {
        return this._resultData;
    }

    public get otherResultData(): PetBreedingResultData
    {
        return this._otherResultData;
    }
}
