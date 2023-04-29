import { PetBreedingResultData } from '.';
import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PetBreedingResultParser implements IMessageParser
{
    private _resultData: PetBreedingResultData;
    private _otherResultData: PetBreedingResultData;

    public flush(): boolean
    {
        this._resultData = null;
        this._otherResultData = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._resultData = new PetBreedingResultData(wrapper);
        this._otherResultData = new PetBreedingResultData(wrapper);

        return true;
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
