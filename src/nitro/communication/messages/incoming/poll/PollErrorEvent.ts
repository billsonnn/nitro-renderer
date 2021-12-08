import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PollErrorParser } from '../../parser/poll/PollErrorParser';

export class PollErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PollErrorParser);
    }

    public getParser(): PollErrorParser
    {
        return this.parser as PollErrorParser;
    }
}
