import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { VoucherRedeemOkMessageParser } from '../../parser';

export class VoucherRedeemOkMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, VoucherRedeemOkMessageParser);
    }

    public getParser(): VoucherRedeemOkMessageParser
    {
        return this.parser as VoucherRedeemOkMessageParser;
    }
}
