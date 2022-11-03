import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuizDataMessageParser } from '../../parser';

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
