import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UpdateThreadMessageParser } from '../../parser/groupforums/UpdateThreadMessageParser';

export class UpdateThreadMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UpdateThreadMessageParser);
    }

    public getParser(): UpdateThreadMessageParser
    {
        return this.parser as UpdateThreadMessageParser;
    }
}
