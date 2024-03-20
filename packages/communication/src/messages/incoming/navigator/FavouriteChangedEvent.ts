import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { FavouriteChangedMessageParser } from '../../parser';

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
