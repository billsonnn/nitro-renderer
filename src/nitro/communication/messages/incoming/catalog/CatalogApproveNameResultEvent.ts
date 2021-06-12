import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogApproveNameResultParser } from '../../parser';

export class CatalogApproveNameResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogApproveNameResultParser);
    }

    public getParser(): CatalogApproveNameResultParser
    {
        return this.parser as CatalogApproveNameResultParser;
    }
}
