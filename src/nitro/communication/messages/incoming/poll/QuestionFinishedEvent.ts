import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { QuestionFinishedParser } from '../../parser/poll/QuestionFinishedParser';

export class QuestionFinishedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestionFinishedParser);
    }

    public getParser(): QuestionFinishedParser
    {
        return this.parser as QuestionFinishedParser;
    }
}
