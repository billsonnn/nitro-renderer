import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserProfileParser } from '../../../parser';

export class UserProfileEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserProfileParser);
    }

    public getParser(): UserProfileParser
    {
        return this.parser as UserProfileParser;
    }
}
