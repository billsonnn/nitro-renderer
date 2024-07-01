import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { AreaHideMessageParser } from '../../../parser';

export class AreaHideMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AreaHideMessageParser);
    }

    public getParser(): AreaHideMessageParser
    {
        return this.parser as AreaHideMessageParser;
    }
}
