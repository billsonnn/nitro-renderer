import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
