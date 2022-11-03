import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomInviteParser } from '../../parser';

export class RoomInviteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInviteParser);
    }

    public getParser(): RoomInviteParser
    {
        return this.parser as RoomInviteParser;
    }
}
