import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { YoutubeDisplayPlaylistsMessageParser } from '../../../../parser/room/furniture/youtube/YoutubeDisplayPlaylistsMessageParser';

export class YoutubeDisplayPlaylistsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeDisplayPlaylistsMessageParser);
    }

    public getParser(): YoutubeDisplayPlaylistsMessageParser
    {
        return this.parser as YoutubeDisplayPlaylistsMessageParser;
    }
}
