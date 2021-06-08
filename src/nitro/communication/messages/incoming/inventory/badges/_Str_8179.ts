import { IsBadgeRequestFulfilledParser } from 'nitro-renderer/src/nitro/communication/messages/parser/inventory/badges/IsBadgeRequestFulfilledParser';
import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';

export class _Str_8179 extends MessageEvent implements IMessageEvent
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
