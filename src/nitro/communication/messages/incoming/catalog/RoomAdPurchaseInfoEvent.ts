import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { RoomAdPurchaseInfoEventParser } from '../../parser';

export class RoomAdPurchaseInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomAdPurchaseInfoEventParser);
    }

    public getParser(): RoomAdPurchaseInfoEventParser
    {
        return this.parser as RoomAdPurchaseInfoEventParser;
    }
}
