import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class RespectReceivedParser implements IMessageParser
{
    private _userId: number;
    private _respectsReceived: number;

    public flush(): boolean
    {
        this._userId            = 0;
        this._respectsReceived  = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId            = wrapper.readInt();
        this._respectsReceived  = wrapper.readInt();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get respectsReceived(): number
    {
        return this._respectsReceived;
    }
}