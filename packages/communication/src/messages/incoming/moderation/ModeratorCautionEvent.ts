import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ModerationCautionParser } from '../../parser';

export class ModeratorCautionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModerationCautionParser);
    }

    public getParser(): ModerationCautionParser
    {
        return this.parser as ModerationCautionParser;
    }
}
