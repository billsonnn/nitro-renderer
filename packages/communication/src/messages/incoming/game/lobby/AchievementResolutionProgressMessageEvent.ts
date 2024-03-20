import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { AchievementResolutionProgressMessageParser } from '../../../parser';

export class AchievementResolutionProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementResolutionProgressMessageParser);
    }

    public getParser(): AchievementResolutionProgressMessageParser
    {
        return this.parser as AchievementResolutionProgressMessageParser;
    }
}
