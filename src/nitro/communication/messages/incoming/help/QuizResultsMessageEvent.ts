import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuizResultsMessageParser } from '../../parser';

export class QuizResultsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuizResultsMessageParser);
    }

    public getParser(): QuizResultsMessageParser
    {
        return this.parser as QuizResultsMessageParser;
    }
}
