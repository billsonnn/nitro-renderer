import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PerkAllowancesMessageParser } from './../../parser/perk/PerkAllowancesMessageParser';

export class PerkAllowancesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PerkAllowancesMessageParser);
    }

    public getParser(): PerkAllowancesMessageParser
    {
        return this.parser as PerkAllowancesMessageParser;
    }
}
