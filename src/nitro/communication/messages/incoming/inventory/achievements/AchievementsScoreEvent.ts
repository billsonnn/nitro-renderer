import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AchievementsScoreParser } from '../../../parser';

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
