import { IMessageEvent, MessageEvent } from '../../../../../core';
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
