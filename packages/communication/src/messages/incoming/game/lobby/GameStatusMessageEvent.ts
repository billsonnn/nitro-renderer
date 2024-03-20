import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GameStatusMessageParser } from '../../../parser';

export class GameStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GameStatusMessageParser);
    }

    public getParser(): GameStatusMessageParser
    {
        return this.parser as GameStatusMessageParser;
    }
}
