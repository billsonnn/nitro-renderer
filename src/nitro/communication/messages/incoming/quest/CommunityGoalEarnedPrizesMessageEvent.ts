import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CommunityGoalEarnedPrizesMessageParser } from '../../parser';

export class CommunityGoalEarnedPrizesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalEarnedPrizesMessageParser);
    }

    public getParser(): CommunityGoalEarnedPrizesMessageParser
    {
        return this.parser as CommunityGoalEarnedPrizesMessageParser;
    }
}
