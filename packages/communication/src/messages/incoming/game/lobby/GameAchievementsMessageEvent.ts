import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GameAchievementsMessageParser } from '../../../parser';

export class GameAchievementsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GameAchievementsMessageParser);
    }

    public getParser(): GameAchievementsMessageParser
    {
        return this.parser as GameAchievementsMessageParser;
    }
}
