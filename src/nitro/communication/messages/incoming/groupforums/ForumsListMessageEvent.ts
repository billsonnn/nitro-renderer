import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GetForumsListMessageParser } from '../../parser/groupforums/GetForumsListMessageParser';

export class ForumsListMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GetForumsListMessageParser);
    }

    public getParser(): GetForumsListMessageParser
    {
        return this.parser as GetForumsListMessageParser;
    }
}
