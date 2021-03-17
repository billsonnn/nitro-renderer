import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FurnitureFloorAddParser } from '../../../../parser/room/furniture/floor/FurnitureFloorAddParser';

export class FurnitureFloorAddEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorAddParser);
    }

    public getParser(): FurnitureFloorAddParser
    {
        return this.parser as FurnitureFloorAddParser;
    }
}