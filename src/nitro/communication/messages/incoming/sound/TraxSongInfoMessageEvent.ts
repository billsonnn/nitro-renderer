import { IMessageEvent, MessageEvent } from '../../../../../core';
import { TraxSongInfoMessageParser } from '../../parser';

export class TraxSongInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TraxSongInfoMessageParser);
    }

    public getParser(): TraxSongInfoMessageParser
    {
        return this.parser as TraxSongInfoMessageParser;
    }
}
