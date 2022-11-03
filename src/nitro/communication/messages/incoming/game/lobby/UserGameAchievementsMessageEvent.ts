import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { UserGameAchievementsMessageParser } from '../../../parser/game/lobby';

export class UserGameAchievementsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserGameAchievementsMessageParser);
    }

    public getParser(): UserGameAchievementsMessageParser
    {
        return this.parser as UserGameAchievementsMessageParser;
    }
}
