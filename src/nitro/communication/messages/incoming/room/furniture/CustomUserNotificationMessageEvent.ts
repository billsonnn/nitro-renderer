import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { CustomUserNotificationMessageParser } from '../../../parser/room/furniture/CustomUserNotificationMessageParser';

export class CustomUserNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CustomUserNotificationMessageParser);
    }

    public getParser(): CustomUserNotificationMessageParser
    {
        return this.parser as CustomUserNotificationMessageParser;
    }
}
