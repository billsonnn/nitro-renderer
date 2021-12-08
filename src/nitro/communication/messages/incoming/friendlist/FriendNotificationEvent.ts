import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { DesktopViewParser } from '../../parser/desktop/DesktopViewParser';
import { FriendNotificationParser } from '../../parser/friendlist/FriendNotificationParser';

export class FriendNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendNotificationParser);
    }

    public getParser(): DesktopViewParser
    {
        return this.parser as FriendNotificationParser;
    }
}
