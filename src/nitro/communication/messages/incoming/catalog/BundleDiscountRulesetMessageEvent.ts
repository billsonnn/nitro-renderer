import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { BundleDiscountRulesetMessageParser } from '../../parser';

export class BundleDiscountRulesetMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BundleDiscountRulesetMessageParser);
    }

    public getParser(): BundleDiscountRulesetMessageParser
    {
        return this.parser as BundleDiscountRulesetMessageParser;
    }
}
