import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomEventMessageParser } from '../../parser';

export class RoomEventEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEventMessageParser);
    }

    public getParser(): RoomEventMessageParser
    {
        return this.parser as RoomEventMessageParser;
    }
}
