import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ConcurrentUsersGoalProgressMessageParser } from '../../parser/quest/ConcurrentUsersGoalProgressMessageParser';

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
