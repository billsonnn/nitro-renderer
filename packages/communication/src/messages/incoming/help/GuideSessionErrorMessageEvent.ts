import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GuideSessionErrorMessageParser } from '../../parser';

export class GuideSessionErrorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionErrorMessageParser);
    }

    public getParser(): GuideSessionErrorMessageParser
    {
        return this.parser as GuideSessionErrorMessageParser;
    }
}
