import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
