import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
