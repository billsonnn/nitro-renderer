import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UnseenItemsParser } from '../../parser/notifications/UnseenItemsParser';

export class UnseenItemsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UnseenItemsParser);
    }

    public getParser(): UnseenItemsParser
    {
        return this.parser as UnseenItemsParser;
    }
}