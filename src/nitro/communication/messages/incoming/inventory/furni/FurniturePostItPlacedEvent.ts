import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurniturePostItPlacedParser } from '../../../parser/inventory/furniture/FurniturePostItPlacedParser';

export class FurniturePostItPlacedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniturePostItPlacedParser);
    }

    public getParser(): FurniturePostItPlacedParser
    {
        return this.parser as FurniturePostItPlacedParser;
    }
}