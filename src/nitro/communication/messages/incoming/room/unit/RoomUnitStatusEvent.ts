import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomUnitStatusParser } from '../../../parser';

export class RoomUnitStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitStatusParser);
    }

    public getParser(): RoomUnitStatusParser
    {
        return this.parser as RoomUnitStatusParser;
    }
}
