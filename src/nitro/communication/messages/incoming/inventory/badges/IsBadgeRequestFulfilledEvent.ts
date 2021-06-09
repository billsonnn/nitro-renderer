import { IMessageEvent } from 'nitro-renderer/src/core/communication/messages/IMessageEvent';
import { MessageEvent } from 'nitro-renderer/src/core/communication/messages/MessageEvent';
import { IsBadgeRequestFulfilledParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/IsBadgeRequestFulfilledParser';

export class IsBadgeRequestFulfilledEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IsBadgeRequestFulfilledParser);
    }

    public getParser(): IsBadgeRequestFulfilledParser
    {
        return this.parser as IsBadgeRequestFulfilledParser;
    }
}
