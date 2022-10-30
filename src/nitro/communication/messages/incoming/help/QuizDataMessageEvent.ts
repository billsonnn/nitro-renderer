import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
