import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { InstantMessageErrorParser } from '../../parser';

export class InstantMessageErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InstantMessageErrorParser);
    }

    public getParser(): InstantMessageErrorParser
    {
        return this.parser as InstantMessageErrorParser;
    }
}
