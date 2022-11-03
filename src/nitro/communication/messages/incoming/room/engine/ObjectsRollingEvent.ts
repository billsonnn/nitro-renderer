import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ObjectsRollingParser } from '../../../parser';

export class ObjectsRollingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ObjectsRollingParser);
    }

    public getParser(): ObjectsRollingParser
    {
        return this.parser as ObjectsRollingParser;
    }
}
