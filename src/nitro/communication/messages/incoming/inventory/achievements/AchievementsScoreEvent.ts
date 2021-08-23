import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { AchievementsScoreParser } from '../../../parser/inventory/achievements/AchievementsScoreParser';

export class AchievementsScoreEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementsScoreParser);
    }

    public getParser(): AchievementsScoreParser
    {
        return this.parser as AchievementsScoreParser;
    }
}
