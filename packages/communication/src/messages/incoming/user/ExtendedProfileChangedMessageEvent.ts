import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ExtendedProfileChangedMessageParser } from '../../parser';

export class ExtendedProfileChangedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ExtendedProfileChangedMessageParser);
    }

    public getParser(): ExtendedProfileChangedMessageParser
    {
        return this.parser as ExtendedProfileChangedMessageParser;
    }
}
