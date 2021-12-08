import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { DiceValueMessageParser } from '../../../parser/room/furniture/DiceValueMessageParser';

export class DiceValueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DiceValueMessageParser);
    }

    public getParser(): DiceValueMessageParser
    {
        return this.parser as DiceValueMessageParser;
    }
}
