import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GuideSessionDetachedMessageParser } from '../../parser';

export class GuideSessionDetachedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionDetachedMessageParser);
    }

    public getParser(): GuideSessionDetachedMessageParser
    {
        return this.parser as GuideSessionDetachedMessageParser;
    }
}
