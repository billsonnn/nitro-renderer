import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GameListMessageParser } from '../../../parser';

export class GameListMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GameListMessageParser);
    }

    public getParser(): GameListMessageParser
    {
        return this.parser as GameListMessageParser;
    }
}
