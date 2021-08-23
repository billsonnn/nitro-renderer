import { IMessageEvent, MessageEvent } from '../../../../../../../core';
import { RoomRightsParser } from '../../../../parser/room/access/rights/RoomRightsParser';

export class RoomRightsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsParser);
    }

    public getParser(): RoomRightsParser
    {
        return this.parser as RoomRightsParser;
    }
}
