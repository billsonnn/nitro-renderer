import { IMessageDataWrapper } from '@nitrots/api';
import { IFlatUser } from './IFlatUser';

export class BannedUserData implements IFlatUser
{
    private _userId: number;
    private _userName: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }
}
