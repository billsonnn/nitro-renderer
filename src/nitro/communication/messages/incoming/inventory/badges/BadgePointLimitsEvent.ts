import { IMessageEvent } from 'nitro-renderer/src/core/communication/messages/IMessageEvent';
import { MessageEvent } from 'nitro-renderer/src/core/communication/messages/MessageEvent';
import { BadgePointLimitsParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/BadgePointLimitsParser';

export class BadgePointLimitsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgePointLimitsParser);
    }

    public getParser(): BadgePointLimitsParser
    {
        return this.parser as BadgePointLimitsParser;
    }
}
