import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
