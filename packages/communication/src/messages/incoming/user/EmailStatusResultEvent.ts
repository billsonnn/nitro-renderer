import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { EmailStatusParser } from '../../parser';

export class EmailStatusResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, EmailStatusParser);
    }

    public getParser(): EmailStatusParser
    {
        return this.parser as EmailStatusParser;
    }
}
