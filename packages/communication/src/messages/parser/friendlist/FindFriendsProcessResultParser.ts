import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FindFriendsProcessResultParser implements IMessageParser
{
    private _success: boolean;

    public flush(): boolean
    {
        this._success = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._success = wrapper.readBoolean();

        return true;
    }

    public get success(): boolean
    {
        return this._success;
    }
}
