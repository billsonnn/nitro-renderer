import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomUnitHandItemReceivedParser } from '../../../parser';

export class RoomUnitHandItemReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitHandItemReceivedParser);
    }

    public getParser(): RoomUnitHandItemReceivedParser
    {
        return this.parser as RoomUnitHandItemReceivedParser;
    }
}
