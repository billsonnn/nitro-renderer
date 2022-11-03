import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { PurchaseOKMessageParser } from '../../parser';

export class PurchaseOKMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PurchaseOKMessageParser);
    }

    public getParser(): PurchaseOKMessageParser
    {
        return this.parser as PurchaseOKMessageParser;
    }
}
