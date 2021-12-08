import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MOTDNotificationParser } from '../../parser/notifications/MOTDNotificationParser';

export class MOTDNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MOTDNotificationParser);
    }

    public getParser(): MOTDNotificationParser
    {
        return this.parser as MOTDNotificationParser;
    }
}
