import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UpdateMessageMessageParser } from '../../parser/groupforums/UpdateMessageMessageParser';

export class UpdateMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UpdateMessageMessageParser);
    }

    public getParser(): UpdateMessageMessageParser
    {
        return this.parser as UpdateMessageMessageParser;
    }
}
