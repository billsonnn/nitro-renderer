import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { WiredOpenParser } from '../../parser';

export class WiredOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredOpenParser);
    }

    public getParser(): WiredOpenParser
    {
        return this.parser as WiredOpenParser;
    }
}
