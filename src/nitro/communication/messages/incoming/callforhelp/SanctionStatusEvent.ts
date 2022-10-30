import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { SanctionStatusMessageParser } from '../../parser/callforhelp';

export class SanctionStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SanctionStatusMessageParser);
    }

    public getParser(): SanctionStatusMessageParser
    {
        return this.parser as SanctionStatusMessageParser;
    }
}
