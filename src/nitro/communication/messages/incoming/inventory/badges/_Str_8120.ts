import { BadgeReceivedParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/BadgeReceivedParser';
import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';

export class _Str_8120 extends MessageEvent implements IMessageEvent
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
