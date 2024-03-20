import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
