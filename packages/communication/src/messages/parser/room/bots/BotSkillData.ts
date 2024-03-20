import { IMessageDataWrapper } from '@nitrots/api';

export class BotSkillData
{
    private _id: number;
    private _data: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._id = wrapper.readInt();
        this._data = wrapper.readString();
    }

    public get id(): number
    {
        return this._id;
    }

    public get data(): string
    {
        return this._data;
    }
}
