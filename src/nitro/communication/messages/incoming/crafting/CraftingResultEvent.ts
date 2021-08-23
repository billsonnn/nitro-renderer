import { IMessageEvent, MessageEvent } from '../../../../../core';
import { CraftingResultMessageParser } from '../../parser/crafting/CraftingResultMessageParser';

export class CraftingResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingResultMessageParser);
    }

    public getParser(): CraftingResultMessageParser
    {
        return this.parser as CraftingResultMessageParser;
    }
}
