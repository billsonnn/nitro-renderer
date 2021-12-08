import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionStartedMessageParser } from '../../parser/help/GuideSessionStartedMessageParser';

export class GuideSessionStartedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionStartedMessageParser);
    }

    public getParser(): GuideSessionStartedMessageParser
    {
        return this.parser as GuideSessionStartedMessageParser;
    }
}
