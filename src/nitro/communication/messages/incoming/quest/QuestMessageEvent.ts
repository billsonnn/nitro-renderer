import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuestMessageParser } from '../../parser';

export class QuestMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestMessageParser);
    }

    public getParser(): QuestMessageParser
    {
        return this.parser as QuestMessageParser;
    }
}
