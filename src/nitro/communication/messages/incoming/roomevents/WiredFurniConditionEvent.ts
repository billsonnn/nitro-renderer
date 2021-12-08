import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WiredFurniConditionParser } from '../../parser/roomevents/WiredFurniConditionParser';

export class WiredFurniConditionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniConditionParser);
    }

    public getParser(): WiredFurniConditionParser
    {
        return this.parser as WiredFurniConditionParser;
    }
}
