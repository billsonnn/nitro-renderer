import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { RoomEventCancelMessageParser } from '../../parser/navigator/RoomEventCancelMessageParser';

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
