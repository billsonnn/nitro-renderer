import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FurnitureWallParser } from '../../../../parser/room/furniture/wall/FurnitureWallParser';

export class FurnitureWallEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallParser);
    }

    public getParser(): FurnitureWallParser
    {
        return this.parser as FurnitureWallParser;
    }
}