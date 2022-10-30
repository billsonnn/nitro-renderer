import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
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
