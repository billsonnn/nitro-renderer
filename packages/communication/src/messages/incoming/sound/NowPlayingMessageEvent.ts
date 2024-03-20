import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { NowPlayingMessageParser } from '../../parser';

export class NowPlayingMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NowPlayingMessageParser);
    }

    public getParser(): NowPlayingMessageParser
    {
        return this.parser as NowPlayingMessageParser;
    }
}
