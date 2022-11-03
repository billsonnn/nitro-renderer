import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
