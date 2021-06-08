import { BadgePointLimitsParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/BadgePointLimitsParser';
import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';

export class _Str_8980 extends MessageEvent implements IMessageEvent
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
