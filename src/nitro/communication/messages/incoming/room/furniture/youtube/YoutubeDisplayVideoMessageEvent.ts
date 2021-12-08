import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { YoutubeDisplayVideoMessageParser } from '../../../../parser/room/furniture/youtube/YoutubeDisplayVideoMessageParser';

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
