import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurnitureListInvalidateParser } from '../../../parser/inventory/furniture/FurnitureListInvalidateParser';

export class FurnitureListInvalidateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureListInvalidateParser);
    }

    public getParser(): FurnitureListInvalidateParser
    {
        return this.parser as FurnitureListInvalidateParser;
    }
}