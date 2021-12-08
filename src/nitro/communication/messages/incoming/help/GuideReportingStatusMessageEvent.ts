import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideReportingStatusMessageParser } from './../../parser/help/GuideReportingStatusMessageParser';

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
