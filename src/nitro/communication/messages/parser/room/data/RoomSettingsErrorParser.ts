import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class RoomSettingsErrorParser implements IMessageParser
{
    private _roomId: number;
    private _code: number;
    private _message: string;

    public flush(): boolean
    {
        this._roomId    = 0;
        this._code      = 0;
        this._message   = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId    = wrapper.readInt();
        this._code      = wrapper.readInt();
        this._message   = wrapper.readString();

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get code(): number
    {
        return this._code;
    }

    public get message(): string
    {
        return this._message;
    }
}