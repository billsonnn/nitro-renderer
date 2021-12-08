import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestionParser } from '../../parser/poll/QuestionParser';

export class QuestionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestionParser);
    }

    public getParser(): QuestionParser
    {
        return this.parser as QuestionParser;
    }
}
