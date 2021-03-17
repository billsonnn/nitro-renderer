import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurnitureDataParser } from '../../../parser/room/furniture/FurnitureDataParser';

export class FurnitureDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureDataParser);
    }

    public getParser(): FurnitureDataParser
    {
        return this.parser as FurnitureDataParser;
    }
}