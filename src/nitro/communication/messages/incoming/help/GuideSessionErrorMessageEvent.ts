import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
