import { IMessageDataWrapper } from '../../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../../core/communication/messages/IMessageParser';

export class RemainingMuteParser implements IMessageParser
{
    private _seconds: number;

    public flush(): boolean
    {
        this._seconds = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._seconds = wrapper.readInt();

        return true;
    }

    public get seconds(): number
    {
        return this._seconds;
    }
}
