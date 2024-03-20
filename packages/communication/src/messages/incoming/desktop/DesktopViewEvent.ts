import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { DesktopViewParser } from '../../parser';

export class DesktopViewEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DesktopViewParser);
    }

    public getParser(): DesktopViewParser
    {
        return this.parser as DesktopViewParser;
    }
}
