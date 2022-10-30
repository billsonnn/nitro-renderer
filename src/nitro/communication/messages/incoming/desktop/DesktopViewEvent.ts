import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { DesktopViewParser } from '../../parser/desktop/DesktopViewParser';

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
