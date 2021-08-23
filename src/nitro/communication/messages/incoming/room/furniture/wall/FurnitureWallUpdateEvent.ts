import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { FurnitureWallUpdateParser } from '../../../../parser/room/furniture/wall/FurnitureWallUpdateParser';

export class FurnitureWallUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallUpdateParser);
    }

    public getParser(): FurnitureWallUpdateParser
    {
        return this.parser as FurnitureWallUpdateParser;
    }
}
