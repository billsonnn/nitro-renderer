import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { BadgesParser } from '../../../parser/inventory/badges/BadgesParser';

export class BadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgesParser);
    }

    public getParser(): BadgesParser
    {
        return this.parser as BadgesParser;
    }
}
