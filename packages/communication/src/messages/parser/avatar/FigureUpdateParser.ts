import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FigureUpdateParser implements IMessageParser
{
    private _figure: string;
    private _gender: string;

    public flush(): boolean
    {
        this._figure = '';
        this._gender = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._figure = wrapper.readString();
        this._gender = wrapper.readString();

        if(this._gender) this._gender = this._gender.toUpperCase();

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
