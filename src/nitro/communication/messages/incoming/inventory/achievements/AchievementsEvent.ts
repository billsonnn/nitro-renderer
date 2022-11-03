import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AchievementsParser } from '../../../parser';

export class AchievementsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementsParser);
    }

    public getParser(): AchievementsParser
    {
        return this.parser as AchievementsParser;
    }
}
