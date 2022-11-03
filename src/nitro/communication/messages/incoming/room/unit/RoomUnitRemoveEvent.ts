import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomUnitRemoveParser } from '../../../parser';

export class RoomUnitRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitRemoveParser);
    }

    public getParser(): RoomUnitRemoveParser
    {
        return this.parser as RoomUnitRemoveParser;
    }
}
