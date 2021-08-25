import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { ObjectsDataUpdateParser } from '../../../parser/room/engine/ObjectsDataUpdateParser';

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
