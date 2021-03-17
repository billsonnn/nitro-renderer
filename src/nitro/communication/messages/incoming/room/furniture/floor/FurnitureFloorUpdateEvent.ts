import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FurnitureFloorUpdateParser } from '../../../../parser/room/furniture/floor/FurnitureFloorUpdateParser';

export class FurnitureFloorUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorUpdateParser);
    }

    public getParser(): FurnitureFloorUpdateParser
    {
        return this.parser as FurnitureFloorUpdateParser;
    }
}