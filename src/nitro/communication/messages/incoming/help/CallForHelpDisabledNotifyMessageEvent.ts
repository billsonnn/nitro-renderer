import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CallForHelpDisabledNotifyMessageParser } from '../../parser/help/CallForHelpDisabledNotifyMessageParser';

export class CallForHelpDisabledNotifyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpDisabledNotifyMessageParser);
    }

    public getParser(): CallForHelpDisabledNotifyMessageParser
    {
        return this.parser as CallForHelpDisabledNotifyMessageParser;
    }
}
