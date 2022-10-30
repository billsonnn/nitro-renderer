import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { PlayListSongAddedMessageParser } from '../../parser';

export class PlayListSongAddedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PlayListSongAddedMessageParser);
    }

    public getParser(): PlayListSongAddedMessageParser
    {
        return this.parser as PlayListSongAddedMessageParser;
    }
}
