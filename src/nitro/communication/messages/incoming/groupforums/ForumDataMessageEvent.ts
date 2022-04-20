import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ForumDataMessageParser } from '../../parser/groupforums/ForumDataMessageParser';

export class ForumDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ForumDataMessageParser);
    }

    public getParser(): ForumDataMessageParser
    {
        return this.parser as ForumDataMessageParser;
    }
}
