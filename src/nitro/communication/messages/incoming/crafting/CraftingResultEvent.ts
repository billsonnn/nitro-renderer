import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
