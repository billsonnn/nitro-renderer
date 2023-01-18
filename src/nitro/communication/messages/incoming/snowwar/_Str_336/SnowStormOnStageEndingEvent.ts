import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { SnowStormOnStageEndingParser } from '../../../parser';

export class SnowStormOnStageEndingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SnowStormOnStageEndingParser);
    }

    public getParser(): SnowStormOnStageEndingParser
    {
        return this.parser as SnowStormOnStageEndingParser;
    }
}
