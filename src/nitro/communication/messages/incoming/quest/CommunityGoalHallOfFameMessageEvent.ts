import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CommunityGoalHallOfFameMessageParser } from '../../parser';

export class CommunityGoalHallOfFameMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalHallOfFameMessageParser);
    }

    public getParser(): CommunityGoalHallOfFameMessageParser
    {
        return this.parser as CommunityGoalHallOfFameMessageParser;
    }
}
