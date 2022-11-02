import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CraftingResultObjectParser } from './CraftingResultObjectParser';

export class CraftingResultMessageParser implements IMessageParser
{
    private _success: boolean;
    private _result: CraftingResultObjectParser;

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;
        this._success = wrapper.readBoolean();
        if(this._success)
        {
            this._result = new CraftingResultObjectParser(wrapper);
        }
        return true;
    }

    public flush(): boolean
    {
        this._success = false;
        return true;
    }

    public get success(): boolean
    {
        return this._success;
    }

    public get result(): CraftingResultObjectParser
    {
        return this._result;
    }
}
