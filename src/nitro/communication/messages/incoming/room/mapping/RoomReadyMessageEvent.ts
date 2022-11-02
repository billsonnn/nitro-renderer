import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomReadyMessageParser } from '../../../parser';

export class RoomReadyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomReadyMessageParser);
    }

    public getParser(): RoomReadyMessageParser
    {
        return this.parser as RoomReadyMessageParser;
    }
}
