import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { TryVerificationCodeResultParser } from '../../parser';

export class TryVerificationCodeResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TryVerificationCodeResultParser);
    }

    public getParser(): TryVerificationCodeResultParser
    {
        return this.parser as TryVerificationCodeResultParser;
    }
}
