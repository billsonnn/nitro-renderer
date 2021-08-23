import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { CantConnectMessageParser } from '../../../parser/room/access/CantConnectMessageParser';

export class RoomEnterErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CantConnectMessageParser);
    }

    public getParser(): CantConnectMessageParser
    {
        return this.parser as CantConnectMessageParser;
    }
}
