import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { AchievementNotificationMessageParser } from '../../parser';

export class AchievementNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementNotificationMessageParser);
    }

    public getParser(): AchievementNotificationMessageParser
    {
        return this.parser as AchievementNotificationMessageParser;
    }
}
