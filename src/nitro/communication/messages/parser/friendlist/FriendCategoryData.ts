import { IMessageDataWrapper } from '../../../../../api';

export class FriendCategoryData
{
    private _id: number;
    private _name: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }
}
