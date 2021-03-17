import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingResultEvent extends RoomSessionEvent
{
    public static RSPFUE_PET_BREEDING_RESULT: string = 'RSPFUE_PET_BREEDING_RESULT';

    private _resultData: any; //PetInfoMessageParser
    private _otherResultData: any;

    constructor(k: IRoomSession, _arg_2: any, _arg_3: any)
    {
        super(RoomSessionPetBreedingResultEvent.RSPFUE_PET_BREEDING_RESULT, k);

        this._resultData        = _arg_2;
        this._otherResultData   = _arg_3;
    }

    public get _Str_3713(): any
    {
        return this._resultData;
    }

    public get _Str_5840(): any
    {
        return this._otherResultData;
    }
}