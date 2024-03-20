import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ConfirmBreedingResultParser implements IMessageParser
{
    private _breedingNestStuffId: number;
    private _result: number;

    public flush(): boolean
    {
        this._breedingNestStuffId = 0;
        this._result = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._breedingNestStuffId = wrapper.readInt();
        this._result = wrapper.readInt();

        return true;
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
