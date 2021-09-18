import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { YoutubeControlVideoMessageParser } from '../../../../parser/room/furniture/youtube/YoutubeControlVideoMessageParser';

export class YoutubeControlVideoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeControlVideoMessageParser);
    }

    public getParser(): YoutubeControlVideoMessageParser
    {
        return this.parser as YoutubeControlVideoMessageParser;
    }
}
