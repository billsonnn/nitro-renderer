import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { UserFlatCatsMessageParser } from '../../parser/navigator/UserFlatCatsMessageParser';

export class UserFlatCatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserFlatCatsMessageParser);
    }

    public getParser(): UserFlatCatsMessageParser
    {
        return this.parser as UserFlatCatsMessageParser;
    }
}
