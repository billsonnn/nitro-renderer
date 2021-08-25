import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CraftingRecipesAvailableMessageParser } from '../../parser/crafting/CraftingRecipesAvailableMessageParser';

export class CraftingRecipesAvailableEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingRecipesAvailableMessageParser);
    }

    public getParser(): CraftingRecipesAvailableMessageParser
    {
        return this.parser as CraftingRecipesAvailableMessageParser;
    }
}
