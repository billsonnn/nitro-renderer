import { IMessageEvent, MessageEvent } from '../../../../../core';
import { WiredFurniConditionParser } from '../../parser/roomevents/WiredFurniConditionParser';

export class WiredFurniConditionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniConditionParser);
    }

    public getParser(): WiredFurniConditionParser
    {
        return this.parser as WiredFurniConditionParser;
    }
}
