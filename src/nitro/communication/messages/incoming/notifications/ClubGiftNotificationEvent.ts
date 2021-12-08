import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ClubGiftNotificationParser } from '../../parser';

export class ClubGiftNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClubGiftNotificationParser);
    }

    public getParser(): ClubGiftNotificationParser
    {
        return this.parser as ClubGiftNotificationParser;
    }
}
