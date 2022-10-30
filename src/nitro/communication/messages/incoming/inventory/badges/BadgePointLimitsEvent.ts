import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { BadgePointLimitsParser } from '../../../parser/inventory/badges/BadgePointLimitsParser';

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
