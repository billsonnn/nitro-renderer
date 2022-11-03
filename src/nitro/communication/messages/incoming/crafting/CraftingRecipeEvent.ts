import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CraftingRecipeMessageParser } from '../../parser';

export class CraftingRecipeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingRecipeMessageParser);
    }

    public getParser(): CraftingRecipeMessageParser
    {
        return this.parser as CraftingRecipeMessageParser;
    }
}
