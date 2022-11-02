import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { UserWardrobePageParser } from '../../../parser';

export class UserWardrobePageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserWardrobePageParser);
    }

    public getParser(): UserWardrobePageParser
    {
        return this.parser as UserWardrobePageParser;
    }
}
