import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { GuideSessionMessageMessageParser } from '../../parser/help/GuideSessionMessageMessageParser';

export class GuideSessionMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionMessageMessageParser);
    }

    public getParser(): GuideSessionMessageMessageParser
    {
        return this.parser as GuideSessionMessageMessageParser;
    }
}
