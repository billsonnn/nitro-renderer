import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionAttachedMessageParser } from '../../parser/help/GuideSessionAttachedMessageParser';

export class GuideSessionAttachedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionAttachedMessageParser);
    }

    public getParser(): GuideSessionAttachedMessageParser
    {
        return this.parser as GuideSessionAttachedMessageParser;
    }
}
