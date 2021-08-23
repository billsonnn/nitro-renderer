import { IMessageEvent, MessageEvent } from '../../../../../core';
import { CraftableProductsMessageParser } from '../../parser/crafting/CraftableProductsMessageParser';

export class CraftableProductsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftableProductsMessageParser);
    }

    public getParser(): CraftableProductsMessageParser
    {
        return this.parser as CraftableProductsMessageParser;
    }
}
