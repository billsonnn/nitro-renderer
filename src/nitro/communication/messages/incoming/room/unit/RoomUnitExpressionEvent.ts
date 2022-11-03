import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomUnitExpressionParser } from '../../../parser';

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
