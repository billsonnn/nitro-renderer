import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomUnitEffectParser } from '../../../parser/room/unit/RoomUnitEffectParser';

export class RoomUnitEffectEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitEffectParser);
    }

    public getParser(): RoomUnitEffectParser
    {
        return this.parser as RoomUnitEffectParser;
    }
}