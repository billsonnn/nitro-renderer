import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
