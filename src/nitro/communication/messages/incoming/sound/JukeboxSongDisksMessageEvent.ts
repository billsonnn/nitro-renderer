import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { JukeboxSongDisksMessageParser } from '../../parser';

export class JukeboxSongDisksMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, JukeboxSongDisksMessageParser);
    }

    public getParser(): JukeboxSongDisksMessageParser
    {
        return this.parser as JukeboxSongDisksMessageParser;
    }
}
