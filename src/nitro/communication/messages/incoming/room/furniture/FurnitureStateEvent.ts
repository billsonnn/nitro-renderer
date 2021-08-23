import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { FurnitureStateParser } from '../../../parser/room/furniture/FurnitureStateParser';

export class FurnitureStateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureStateParser);
    }

    public getParser(): FurnitureStateParser
    {
        return this.parser as FurnitureStateParser;
    }
}
