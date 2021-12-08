import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionEndedMessageParser } from '../../parser/help/GuideSessionEndedMessageParser';

export class GuideSessionEndedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionEndedMessageParser);
    }

    public getParser(): GuideSessionEndedMessageParser
    {
        return this.parser as GuideSessionEndedMessageParser;
    }
}
