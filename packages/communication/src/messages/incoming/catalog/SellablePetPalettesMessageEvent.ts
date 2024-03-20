import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { SellablePetPalettesParser } from '../../parser';

export class SellablePetPalettesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SellablePetPalettesParser);
    }

    public getParser(): SellablePetPalettesParser
    {
        return this.parser as SellablePetPalettesParser;
    }
}
