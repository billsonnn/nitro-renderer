import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UnreadForumsCountMessageParser } from '../../parser/groupforums/UnreadForumsCountMessageParser';

export class UnreadForumsCountMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UnreadForumsCountMessageParser);
    }

    public getParser(): UnreadForumsCountMessageParser
    {
        return this.parser as UnreadForumsCountMessageParser;
    }
}
