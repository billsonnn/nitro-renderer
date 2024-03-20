import { IMessageDataWrapper } from '@nitrots/api';
import { INamed } from '../moderation';

export class CallForHelpTopicData implements INamed
{
    private _name: string;
    private _id: number;
    private _consequence: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._name = wrapper.readString();
        this._id = wrapper.readInt();
        this._consequence = wrapper.readString();
    }

    public get name(): string
    {
        return this._name;
    }

    public get id(): number
    {
        return this._id;
    }

    public get consequence(): string
    {
        return this._consequence;
    }
}
