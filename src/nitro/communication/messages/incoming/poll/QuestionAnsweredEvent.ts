import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestionAnsweredParser } from '../../parser/poll/QuestionAnsweredParser';

export class QuestionAnsweredEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestionAnsweredParser);
    }

    public getParser(): QuestionAnsweredParser
    {
        return this.parser as QuestionAnsweredParser;
    }
}
