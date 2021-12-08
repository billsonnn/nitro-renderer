import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { ItemDataUpdateMessageParser } from '../../../parser/room/furniture/ItemDataUpdateMessageParser';

export class ItemDataUpdateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ItemDataUpdateMessageParser);
    }

    public getParser(): ItemDataUpdateMessageParser
    {
        return this.parser as ItemDataUpdateMessageParser;
    }
}
