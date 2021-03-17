import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogRedeemVoucherOkParser } from '../../parser/catalog/CatalogRedeemVoucherOkParser';

export class CatalogRedeemVoucherOkEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogRedeemVoucherOkParser);
    }

    public getParser(): CatalogRedeemVoucherOkParser
    {
        return this.parser as CatalogRedeemVoucherOkParser;
    }
}