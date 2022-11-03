import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { LoveLockFurniFinishedParser } from '../../../parser';

export class LoveLockFurniFinishedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoveLockFurniFinishedParser);
    }

    public getParser(): LoveLockFurniFinishedParser
    {
        return this.parser as LoveLockFurniFinishedParser;
    }
}
