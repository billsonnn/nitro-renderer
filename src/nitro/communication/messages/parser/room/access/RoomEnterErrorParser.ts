import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class RoomEnterErrorParser implements IMessageParser
{
    public static FULL_ERROR: number    = 1;
    public static _Str_19431: number    = 2;
    public static QUEUE_ERROR: number   = 3;
    public static BANNED: number        = 4;

    private _reason: number;
    private _parameter: string;

    public flush(): boolean
    {
        this._reason    = 0;
        this._parameter = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason    = wrapper.readInt();
        this._parameter = wrapper.readString();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }

    public get parameter(): string
    {
        return this._parameter;
    }
}