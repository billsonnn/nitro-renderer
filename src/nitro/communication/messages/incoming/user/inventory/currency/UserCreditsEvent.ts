import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { UserCreditsParser } from '../../../../parser';

export class UserCreditsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCreditsParser);
    }

    public getParser(): UserCreditsParser
    {
        return this.parser as UserCreditsParser;
    }
}
