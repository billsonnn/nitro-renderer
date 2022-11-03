import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { LoveLockFurniStartParser } from '../../../parser';

export class LoveLockFurniStartEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoveLockFurniStartParser);
    }

    public getParser(): LoveLockFurniStartParser
    {
        return this.parser as LoveLockFurniStartParser;
    }
}
