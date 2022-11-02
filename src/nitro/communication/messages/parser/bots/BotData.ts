import { IMessageDataWrapper } from '../../../../../api';

export class BotData
{
    private _id: number;
    private _name: string;
    private _motto: string;
    private _gender: string;
    private _figure: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_parser');

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._motto = wrapper.readString();
        this._gender = wrapper.readString();
        this._figure = wrapper.readString();
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get motto(): string
    {
        return this._motto;
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
