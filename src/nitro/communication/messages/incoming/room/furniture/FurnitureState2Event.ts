import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { FurnitureState2Parser } from '../../../parser/room/furniture/FurnitureState2Parser';

export class FurnitureState2Event extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureState2Parser);
    }

    public getParser(): FurnitureState2Parser
    {
        return this.parser as FurnitureState2Parser;
    }
}
