import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class IsUserPartOfCompetitionMessageParser implements IMessageParser
{
    private _Str_8579: boolean;
    private _Str_6987: number;

    public flush(): boolean
    {
        this._Str_8579 = false;
        this._Str_6987 = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._Str_8579 = wrapper.readBoolean();
        this._Str_6987 = wrapper.readInt();

        return true;
    }

    public get _Str_25348(): boolean
    {
        return this._Str_8579;
    }

    public get _Str_10760(): number
    {
        return this._Str_6987;
    }
}
