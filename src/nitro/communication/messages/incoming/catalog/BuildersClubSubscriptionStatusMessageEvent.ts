import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
