import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CallForHelpResultMessageParser } from '../../parser';

export class CallForHelpResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpResultMessageParser);
    }

    public getParser(): CallForHelpResultMessageParser
    {
        return this.parser as CallForHelpResultMessageParser;
    }
}
