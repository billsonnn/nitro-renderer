import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { ObjectsRollingParser } from '../../../parser/room/engine/ObjectsRollingParser';

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
