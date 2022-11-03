import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuestionParser } from '../../parser';

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
