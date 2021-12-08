import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuizDataMessageParser } from '../../parser/help/QuizDataMessageParser';

export class QuizDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuizDataMessageParser);
    }

    public getParser(): QuizDataMessageParser
    {
        return this.parser as QuizDataMessageParser;
    }
}
