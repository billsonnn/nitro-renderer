import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { RoomUnitExpressionParser } from '../../../parser/room/unit/RoomUnitExpressionParser';

export class RoomUnitExpressionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitExpressionParser);
    }

    public getParser(): RoomUnitExpressionParser
    {
        return this.parser as RoomUnitExpressionParser;
    }
}
