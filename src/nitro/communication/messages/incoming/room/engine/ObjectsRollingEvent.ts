import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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