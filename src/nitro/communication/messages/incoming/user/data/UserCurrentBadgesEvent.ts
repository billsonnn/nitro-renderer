import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserCurrentBadgesParser } from '../../../parser';

export class UserCurrentBadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrentBadgesParser);
    }

    public getParser(): UserCurrentBadgesParser
    {
        return this.parser as UserCurrentBadgesParser;
    }
}
