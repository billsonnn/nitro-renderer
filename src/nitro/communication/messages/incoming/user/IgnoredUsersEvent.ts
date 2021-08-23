import { IMessageEvent, MessageEvent } from '../../../../../core';
import { IgnoredUsersParser } from '../../parser/user/IgnoredUsersParser';

export class IgnoredUsersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IgnoredUsersParser);
    }

    public getParser(): IgnoredUsersParser
    {
        return this.parser as IgnoredUsersParser;
    }
}
