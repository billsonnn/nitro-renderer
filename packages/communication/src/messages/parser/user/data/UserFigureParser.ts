import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserFigureParser implements IMessageParser
{
    private _figure: string;
    private _gender: string;

    public flush(): boolean
    {
        this._figure = null;
        this._gender = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._figure = wrapper.readString();
        this._gender = wrapper.readString();

        return true;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }
}
