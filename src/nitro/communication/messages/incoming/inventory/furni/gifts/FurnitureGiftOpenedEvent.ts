import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FurnitureGiftOpenedParser } from '../../../../parser/inventory/furniture/FurnitureGiftOpenedParser';

// see _Str_9591
export class FurnitureGiftOpenedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureGiftOpenedParser);
    }

    public getParser(): FurnitureGiftOpenedParser
    {
        return this.parser as FurnitureGiftOpenedParser;
    }
}
