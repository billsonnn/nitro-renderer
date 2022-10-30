import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { UserInfoParser } from '../../../parser/user/data/UserInfoParser';

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
