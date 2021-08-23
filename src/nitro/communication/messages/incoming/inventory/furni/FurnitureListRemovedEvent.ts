import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { FurnitureListRemovedParser } from '../../../parser/inventory/furniture/FurnitureListRemovedParser';

export class FurnitureListRemovedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureListRemovedParser);
    }

    public getParser(): FurnitureListRemovedParser
    {
        return this.parser as FurnitureListRemovedParser;
    }
}
