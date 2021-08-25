import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { InfoFeedEnableMessageParser } from '../../parser';

export class InfoFeedEnableMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InfoFeedEnableMessageParser);
    }

    public getParser(): InfoFeedEnableMessageParser
    {
        return this.parser as InfoFeedEnableMessageParser;
    }
}
