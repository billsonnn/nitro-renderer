import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class UserUnbannedFromRoomParser implements IMessageParser
{
    private _roomId: number;
    private _userId: number;

    public flush(): boolean
    {
        this._roomId = 0;
        this._userId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._userId = wrapper.readInt();

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get userId(): number
    {
        return this._userId;
    }
}
