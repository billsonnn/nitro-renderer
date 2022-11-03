import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuestionAnsweredParser } from '../../parser';

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
