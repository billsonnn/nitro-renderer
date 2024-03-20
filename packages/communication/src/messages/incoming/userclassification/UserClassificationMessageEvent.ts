import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { UserClassificationMessageParser } from '../../parser';

export class UserClassificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserClassificationMessageParser);
    }

    public getParser(): UserClassificationMessageParser
    {
        return this.parser as UserClassificationMessageParser;
    }
}
