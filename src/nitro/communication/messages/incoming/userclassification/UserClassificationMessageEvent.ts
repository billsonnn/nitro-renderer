import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
