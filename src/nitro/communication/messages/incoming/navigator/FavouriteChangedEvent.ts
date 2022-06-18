import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FavouriteChangedMessageParser } from '../../parser/navigator/FavouriteChangedMessageParser';

export class FavouriteChangedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FavouriteChangedMessageParser);
    }

    public getParser(): FavouriteChangedMessageParser
    {
        return this.parser as FavouriteChangedMessageParser;
    }
}
