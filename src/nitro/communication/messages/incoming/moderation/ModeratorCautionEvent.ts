import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModerationCautionParser } from '../../parser/moderation';

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
