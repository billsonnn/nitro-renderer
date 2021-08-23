import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { FurnitureFloorParser } from '../../../../parser/room/furniture/floor/FurnitureFloorParser';

export class FurnitureFloorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorParser);
    }

    public getParser(): FurnitureFloorParser
    {
        return this.parser as FurnitureFloorParser;
    }
}
