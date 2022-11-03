import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ConcurrentUsersGoalProgressMessageParser } from '../../parser';

export class ConcurrentUsersGoalProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConcurrentUsersGoalProgressMessageParser);
    }

    public getParser(): ConcurrentUsersGoalProgressMessageParser
    {
        return this.parser as ConcurrentUsersGoalProgressMessageParser;
    }
}
