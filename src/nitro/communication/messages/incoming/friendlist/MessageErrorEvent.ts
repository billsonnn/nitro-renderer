import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MessageErrorParser } from '../../parser/friendlist/MessageErrorParser';

export class MessageErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessageErrorParser);
    }

    public getParser(): MessageErrorParser
    {
        return this.parser as MessageErrorParser;
    }
}
