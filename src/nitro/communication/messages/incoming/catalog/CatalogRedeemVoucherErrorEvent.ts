import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogRedeemVoucherErrorParser } from '../../parser/catalog/CatalogRedeemVoucherErrorParser';

export class CatalogRedeemVoucherErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogRedeemVoucherErrorParser);
    }

    public getParser(): CatalogRedeemVoucherErrorParser
    {
        return this.parser as CatalogRedeemVoucherErrorParser;
    }
}