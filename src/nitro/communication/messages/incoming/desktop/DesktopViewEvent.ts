import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
