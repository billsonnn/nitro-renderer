import { IMessageEvent, MessageEvent } from '../../../../../../core';
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
