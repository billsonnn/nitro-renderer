import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
