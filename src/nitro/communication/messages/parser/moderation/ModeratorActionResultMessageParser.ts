import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ModeratorActionResultMessageParser implements IMessageParser
{
    private _userId: number;
    private _success: boolean;

    public flush(): boolean
    {
        this._userId = -1;
        this._success = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._userId = wrapper.readInt();
        this._success = wrapper.readBoolean();
        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get success(): boolean
    {
        return this._success;
    }
}
