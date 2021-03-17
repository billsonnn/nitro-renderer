import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FurnitureFloorRemoveParser } from '../../../../parser/room/furniture/floor/FurnitureFloorRemoveParser';

export class FurnitureFloorRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorRemoveParser);
    }

    public getParser(): FurnitureFloorRemoveParser
    {
        return this.parser as FurnitureFloorRemoveParser;
    }
}