import { IMessageEvent } from 'nitro-renderer/src/core/communication/messages/IMessageEvent';
import { MessageEvent } from 'nitro-renderer/src/core/communication/messages/MessageEvent';
import { BadgeReceivedParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/BadgeReceivedParser';

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
