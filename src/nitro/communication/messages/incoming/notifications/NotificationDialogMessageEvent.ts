import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NotificationDialogMessageParser } from '../../parser/notifications/NotificationDialogMessageParser';

export class NotificationDialogMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NotificationDialogMessageParser);
    }

    public getParser(): NotificationDialogMessageParser
    {
        return this.parser as NotificationDialogMessageParser;
    }
}
