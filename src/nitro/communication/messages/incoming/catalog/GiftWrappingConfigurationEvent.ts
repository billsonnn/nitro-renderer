import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GiftWrappingConfigurationParser } from '../../parser';

export class GiftWrappingConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GiftWrappingConfigurationParser);
    }

    public getParser(): GiftWrappingConfigurationParser
    {
        return this.parser as GiftWrappingConfigurationParser;
    }
}
