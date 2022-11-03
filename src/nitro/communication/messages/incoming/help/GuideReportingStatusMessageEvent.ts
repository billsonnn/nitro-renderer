import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GuideReportingStatusMessageParser } from './../../parser';

export class GuideReportingStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideReportingStatusMessageParser);
    }

    public getParser(): GuideReportingStatusMessageParser
    {
        return this.parser as GuideReportingStatusMessageParser;
    }
}
