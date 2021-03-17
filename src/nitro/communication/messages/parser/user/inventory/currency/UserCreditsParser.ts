import { IMessageDataWrapper } from '../../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../../core/communication/messages/IMessageParser';

export class UserCreditsParser implements IMessageParser
{
    private _credits: string;

    public flush(): boolean
    {
        this._credits = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._credits = wrapper.readString();

        return true;
    }

    public get credits(): string
    {
        return this._credits;
    }
}