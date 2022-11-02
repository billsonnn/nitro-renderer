import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class NoobnessLevelMessageParser implements IMessageParser
{
    private _noobnessLevel: number;

    public flush(): boolean
    {
        this._noobnessLevel = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._noobnessLevel = wrapper.readInt();

        return true;
    }

    public get noobnessLevel(): number
    {
        return this._noobnessLevel;
    }
}
