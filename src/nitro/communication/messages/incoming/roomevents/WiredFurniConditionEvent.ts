import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { WiredFurniConditionParser } from '../../parser';

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
