import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { AchievementParser } from '../../../parser';

export class AchievementEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementParser);
    }

    public getParser(): AchievementParser
    {
        return this.parser as AchievementParser;
    }
}
