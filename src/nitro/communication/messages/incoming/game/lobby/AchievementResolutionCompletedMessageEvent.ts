import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AchievementResolutionCompletedMessageParser } from '../../../parser';

export class AchievementResolutionCompletedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementResolutionCompletedMessageParser);
    }

    public getParser(): AchievementResolutionCompletedMessageParser
    {
        return this.parser as AchievementResolutionCompletedMessageParser;
    }
}
