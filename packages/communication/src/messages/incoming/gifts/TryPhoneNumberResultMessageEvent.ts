import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { TryPhoneNumberResultParser } from '../../parser';

export class TryPhoneNumberResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TryPhoneNumberResultParser);
    }

    public getParser(): TryPhoneNumberResultParser
    {
        return this.parser as TryPhoneNumberResultParser;
    }
}
