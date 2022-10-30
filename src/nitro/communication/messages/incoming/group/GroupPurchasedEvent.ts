import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { GroupPurchasedParser } from '../../parser/group/GroupPurchasedParser';

export class GroupPurchasedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupPurchasedParser);
    }

    public getParser(): GroupPurchasedParser
    {
        return this.parser as GroupPurchasedParser;
    }
}
