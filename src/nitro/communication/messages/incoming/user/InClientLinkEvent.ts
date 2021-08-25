import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { InClientLinkParser } from '../../parser/user/InClientLinkParser';

export class InClientLinkEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InClientLinkParser);
    }

    public getParser(): InClientLinkParser
    {
        return this.parser as InClientLinkParser;
    }
}
