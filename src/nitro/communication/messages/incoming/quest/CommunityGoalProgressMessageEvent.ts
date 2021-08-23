import { IMessageEvent, MessageEvent } from '../../../../../core';
import { CommunityGoalProgressMessageParser } from '../../parser/quest/CommunityGoalProgressMessageParser';

export class CommunityGoalProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalProgressMessageParser);
    }

    public getParser(): CommunityGoalProgressMessageParser
    {
        return this.parser as CommunityGoalProgressMessageParser;
    }
}
