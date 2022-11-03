import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomHeightMapParser } from '../../../parser';

export class RoomHeightMapEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomHeightMapParser);
    }

    public getParser(): RoomHeightMapParser
    {
        return this.parser as RoomHeightMapParser;
    }
}
