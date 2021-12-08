import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
