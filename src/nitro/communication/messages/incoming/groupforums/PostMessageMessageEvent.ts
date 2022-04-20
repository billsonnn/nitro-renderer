import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PostMessageMessageParser } from '../../parser/groupforums/PostMessageMessageParser';

export class PostMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PostMessageMessageParser);
    }

    public getParser(): PostMessageMessageParser
    {
        return this.parser as PostMessageMessageParser;
    }
}
