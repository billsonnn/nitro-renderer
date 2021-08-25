import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GiftReceiverNotFoundParser } from '../../parser';

export class GiftReceiverNotFoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GiftReceiverNotFoundParser);
    }

    public getParser(): GiftReceiverNotFoundParser
    {
        return this.parser as GiftReceiverNotFoundParser;
    }
}
