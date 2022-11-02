import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class GuideSessionPartnerIsTypingMessageParser implements IMessageParser
{
    private _isTyping: boolean;

    public flush(): boolean
    {
        this._isTyping = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isTyping = wrapper.readBoolean();

        return true;
    }

    public get isTyping(): boolean
    {
        return this._isTyping;
    }
}
