import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomInviteErrorParser } from '../../parser';

export class RoomInviteErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInviteErrorParser);
    }

    public getParser(): RoomInviteErrorParser
    {
        return this.parser as RoomInviteErrorParser;
    }
}
