import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CheckUserNameResultMessageParser } from '../../parser';

export class CheckUserNameResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CheckUserNameResultMessageParser);
    }

    public getParser(): CheckUserNameResultMessageParser
    {
        return this.parser as CheckUserNameResultMessageParser;
    }
}
