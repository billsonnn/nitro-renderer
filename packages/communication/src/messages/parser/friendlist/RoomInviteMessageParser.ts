import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomInviteParser implements IMessageParser
{
    private _senderId: number;
    private _messageText: string;

    public flush(): boolean
    {
        this._senderId = 0;
        this._messageText = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._senderId = wrapper.readInt();
        this._messageText = wrapper.readString();

        return true;
    }

    public get senderId(): number
    {
        return this._senderId;
    }

    public get messageText(): string
    {
        return this._messageText;
    }
}
