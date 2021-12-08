import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { VoucherRedeemOkMessageParser } from '../../parser/catalog/VoucherRedeemOkMessageParser';

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
