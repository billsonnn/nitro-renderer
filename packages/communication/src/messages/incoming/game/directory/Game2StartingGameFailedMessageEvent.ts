import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { Game2StartingGameFailedMessageParser } from '../../../parser';

export class Game2StartingGameFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, Game2StartingGameFailedMessageParser);
    }

    public getParser(): Game2StartingGameFailedMessageParser
    {
        return this.parser as Game2StartingGameFailedMessageParser;
    }
}
