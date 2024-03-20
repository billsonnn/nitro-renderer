import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
