import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { BadgeReceivedParser } from '../../../parser/inventory/badges/BadgeReceivedParser';

export class BadgeReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgeReceivedParser);
    }

    public getParser(): BadgeReceivedParser
    {
        return this.parser as BadgeReceivedParser;
    }
}
