import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { RoomRightsParser } from '../../../../parser';

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
