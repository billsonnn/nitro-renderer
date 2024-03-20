import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { JukeboxPlayListFullMessageParser } from '../../parser';

export class JukeboxPlayListFullMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, JukeboxPlayListFullMessageParser);
    }

    public getParser(): JukeboxPlayListFullMessageParser
    {
        return this.parser as JukeboxPlayListFullMessageParser;
    }
}
