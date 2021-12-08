import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionInvitedToGuideRoomMessageParser } from '../../parser/help/GuideSessionInvitedToGuideRoomMessageParser';

export class GuideSessionInvitedToGuideRoomMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionInvitedToGuideRoomMessageParser);
    }

    public getParser(): GuideSessionInvitedToGuideRoomMessageParser
    {
        return this.parser as GuideSessionInvitedToGuideRoomMessageParser;
    }
}
