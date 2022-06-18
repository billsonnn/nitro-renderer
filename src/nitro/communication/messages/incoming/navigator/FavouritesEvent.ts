import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FavouritesMessageParser } from '../../parser/navigator/FavouritesMessageParser';

export class FavouritesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FavouritesMessageParser);
    }

    public getParser(): FavouritesMessageParser
    {
        return this.parser as FavouritesMessageParser;
    }
}
