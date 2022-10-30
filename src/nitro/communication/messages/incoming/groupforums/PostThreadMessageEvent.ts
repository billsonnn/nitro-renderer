import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PostThreadMessageParser } from '../../parser/groupforums/PostThreadMessageParser';

export class PostThreadMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PostThreadMessageParser);
    }

    public getParser(): PostThreadMessageParser
    {
        return this.parser as PostThreadMessageParser;
    }
}
