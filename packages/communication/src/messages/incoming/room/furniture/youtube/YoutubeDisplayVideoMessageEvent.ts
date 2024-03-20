import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { YoutubeDisplayVideoMessageParser } from '../../../../parser';

export class YoutubeDisplayVideoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeDisplayVideoMessageParser);
    }

    public getParser(): YoutubeDisplayVideoMessageParser
    {
        return this.parser as YoutubeDisplayVideoMessageParser;
    }
}
