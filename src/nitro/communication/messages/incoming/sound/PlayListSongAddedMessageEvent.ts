import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
