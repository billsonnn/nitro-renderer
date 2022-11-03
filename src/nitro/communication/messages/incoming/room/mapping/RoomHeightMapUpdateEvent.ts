import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomHeightMapUpdateParser } from '../../../parser';

export class RoomHeightMapUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomHeightMapUpdateParser);
    }

    public getParser(): RoomHeightMapUpdateParser
    {
        return this.parser as RoomHeightMapUpdateParser;
    }
}
