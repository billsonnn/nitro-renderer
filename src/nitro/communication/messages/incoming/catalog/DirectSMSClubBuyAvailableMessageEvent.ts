import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { DirectSMSClubBuyAvailableMessageParser } from '../../parser';

export class DirectSMSClubBuyAvailableMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DirectSMSClubBuyAvailableMessageParser);
    }

    public getParser(): DirectSMSClubBuyAvailableMessageParser
    {
        return this.parser as DirectSMSClubBuyAvailableMessageParser;
    }
}
