import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
