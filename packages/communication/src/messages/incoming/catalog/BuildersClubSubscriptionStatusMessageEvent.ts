import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { BuildersClubSubscriptionStatusMessageParser } from '../../parser';

export class BuildersClubSubscriptionStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BuildersClubSubscriptionStatusMessageParser);
    }

    public getParser(): BuildersClubSubscriptionStatusMessageParser
    {
        return this.parser as BuildersClubSubscriptionStatusMessageParser;
    }
}
