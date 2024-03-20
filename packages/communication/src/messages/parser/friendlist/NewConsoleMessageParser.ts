import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class NewConsoleMessageParser implements IMessageParser
{
    private _senderId: number;
    private _messageText: string;
    private _secondsSinceSent: number;
    private _extraData: string;

    public flush(): boolean
    {
        this._senderId = 0;
        this._messageText = null;
        this._secondsSinceSent = 0;
        this._extraData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._senderId = wrapper.readInt();
        this._messageText = wrapper.readString();
        this._secondsSinceSent = wrapper.readInt();

        if(wrapper.bytesAvailable)
        {
            this._extraData = wrapper.readString();
        }

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

    public get secondsSinceSent(): number
    {
        return this._secondsSinceSent;
    }

    public get extraData(): string
    {
        return this._extraData;
    }
}
