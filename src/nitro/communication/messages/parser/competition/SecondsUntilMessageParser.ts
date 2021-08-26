import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class SecondsUntilMessageParser implements IMessageParser
{
    private _Str_8997: string;
    private _Str_21095: number;

    public flush(): boolean
    {
        this._Str_8997 = null;
        this._Str_21095 = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._Str_8997 = wrapper.readString();
        this._Str_21095 = wrapper.readInt();

        return true;
    }

    public get _Str_23288(): string
    {
        return this._Str_8997;
    }

    public get _Str_25497(): number
    {
        return this._Str_21095;
    }
}
