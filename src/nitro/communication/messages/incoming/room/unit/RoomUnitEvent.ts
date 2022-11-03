import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomUnitParser } from '../../../parser';

export class RoomUnitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitParser);
    }

    public getParser(): RoomUnitParser
    {
        return this.parser as RoomUnitParser;
    }
}
