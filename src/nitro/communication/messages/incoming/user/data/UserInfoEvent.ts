import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserInfoParser } from '../../../parser';

export class UserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserInfoParser);
    }

    public getParser(): UserInfoParser
    {
        return this.parser as UserInfoParser;
    }
}
