import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ObjectsDataUpdateParser } from '../../../parser';

export class ObjectsDataUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ObjectsDataUpdateParser);
    }

    public getParser(): ObjectsDataUpdateParser
    {
        return this.parser as ObjectsDataUpdateParser;
    }
}
