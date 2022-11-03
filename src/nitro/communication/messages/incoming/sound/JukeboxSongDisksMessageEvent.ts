import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
