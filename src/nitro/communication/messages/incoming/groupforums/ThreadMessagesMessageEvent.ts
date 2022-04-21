import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ThreadMessagesMessageParser } from '../../parser/groupforums/ThreadMessagesMessageParser';

export class ThreadMessagesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThreadMessagesMessageParser);
    }

    public getParser(): ThreadMessagesMessageParser
    {
        return this.parser as ThreadMessagesMessageParser;
    }
}
