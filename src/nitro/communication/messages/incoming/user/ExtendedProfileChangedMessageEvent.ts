import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
