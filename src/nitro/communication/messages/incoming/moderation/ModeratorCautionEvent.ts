import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
