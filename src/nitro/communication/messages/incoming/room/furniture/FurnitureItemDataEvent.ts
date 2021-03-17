import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurnitureItemDataParser } from '../../../parser/room/furniture/FurnitureItemDataParser';

export class FurnitureItemDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureItemDataParser);
    }

    public getParser(): FurnitureItemDataParser
    {
        return this.parser as FurnitureItemDataParser;
    }
}