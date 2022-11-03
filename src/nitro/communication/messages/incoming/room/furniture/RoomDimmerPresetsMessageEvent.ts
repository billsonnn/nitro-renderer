import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomDimmerPresetsMessageParser } from '../../../parser';

export class RoomDimmerPresetsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDimmerPresetsMessageParser);
    }

    public getParser(): RoomDimmerPresetsMessageParser
    {
        return this.parser as RoomDimmerPresetsMessageParser;
    }
}
