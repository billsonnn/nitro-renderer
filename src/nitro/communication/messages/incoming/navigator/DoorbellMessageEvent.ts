import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { DoorbellMessageParser } from '../../parser/navigator/DoorbellMessageParser';

export class DoorbellMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DoorbellMessageParser);
    }

    public getParser(): DoorbellMessageParser
    {
        return this.parser as DoorbellMessageParser;
    }

    public get userName(): string
    {
        return this.getParser().userName;
    }
}
