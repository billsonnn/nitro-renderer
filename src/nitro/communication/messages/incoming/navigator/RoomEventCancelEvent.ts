import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomEventCancelMessageParser } from '../../parser';

export class RoomEventCancelEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEventCancelMessageParser);
    }

    public getParser(): RoomEventCancelMessageParser
    {
        return this.parser as RoomEventCancelMessageParser;
    }
}
