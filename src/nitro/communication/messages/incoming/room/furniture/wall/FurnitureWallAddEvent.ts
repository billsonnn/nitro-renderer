import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { FurnitureWallAddParser } from '../../../../parser/room/furniture/wall/FurnitureWallAddParser';

export class FurnitureWallAddEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallAddParser);
    }

    public getParser(): FurnitureWallAddParser
    {
        return this.parser as FurnitureWallAddParser;
    }
}
