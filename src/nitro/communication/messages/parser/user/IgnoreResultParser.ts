import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class IgnoreResultParser implements IMessageParser
{
    private _result: number;
    private _name: string;

    public flush(): boolean
    {
        this._result = -1;
        this._name = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();
        this._name = wrapper.readString();

        return true;
    }

    public get result(): number
    {
        return this._result;
    }

    public get name(): string
    {
        return this._name;
    }
}
