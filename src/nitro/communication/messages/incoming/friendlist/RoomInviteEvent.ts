import { IMessageEvent, MessageEvent } from '../../../../../core';
import { RoomInviteParser } from '../../parser/friendlist/RoomInviteMessageParser';

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
