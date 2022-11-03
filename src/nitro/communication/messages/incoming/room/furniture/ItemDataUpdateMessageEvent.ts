import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ItemDataUpdateMessageParser } from '../../../parser';

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
