import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RecyclerFinishedMessageParser } from '../../parser';

export class RecyclerFinishedMessageEvent extends MessageEvent implements IMessageEvent
{
    public static readonly FINISHED_OK: number = 1;
    public static readonly FINISHED_FAIL: number = 2;

    constructor(callBack: Function)
    {
        super(callBack, RecyclerFinishedMessageParser);
    }

    public getParser(): RecyclerFinishedMessageParser
    {
        return this.parser as RecyclerFinishedMessageParser;
    }
}
