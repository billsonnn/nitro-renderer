import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { RoomRightsClearParser } from '../../../../parser';

export class RoomRightsClearEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsClearParser);
    }

    public getParser(): RoomRightsClearParser
    {
        return this.parser as RoomRightsClearParser;
    }
}
