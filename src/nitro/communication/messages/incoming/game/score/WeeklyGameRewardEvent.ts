import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { WeeklyGameRewardParser } from '../../../parser';

export class WeeklyGameRewardEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WeeklyGameRewardParser);
    }

    public getParser(): WeeklyGameRewardParser
    {
        return this.parser as WeeklyGameRewardParser;
    }
}
