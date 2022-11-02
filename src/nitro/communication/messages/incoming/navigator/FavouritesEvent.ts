import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { FavouritesMessageParser } from '../../parser';

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
