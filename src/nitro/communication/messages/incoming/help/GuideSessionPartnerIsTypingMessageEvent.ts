import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GuideSessionPartnerIsTypingMessageParser } from '../../parser';

export class GuideSessionPartnerIsTypingMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionPartnerIsTypingMessageParser);
    }

    public getParser(): GuideSessionPartnerIsTypingMessageParser
    {
        return this.parser as GuideSessionPartnerIsTypingMessageParser;
    }
}
