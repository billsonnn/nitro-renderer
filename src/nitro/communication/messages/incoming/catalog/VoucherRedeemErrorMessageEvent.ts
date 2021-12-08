import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { VoucherRedeemErrorMessageParser } from '../../parser';

export class VoucherRedeemErrorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, VoucherRedeemErrorMessageParser);
    }

    public getParser(): VoucherRedeemErrorMessageParser
    {
        return this.parser as VoucherRedeemErrorMessageParser;
    }
}
