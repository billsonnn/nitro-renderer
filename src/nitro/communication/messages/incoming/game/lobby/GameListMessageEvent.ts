import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
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
