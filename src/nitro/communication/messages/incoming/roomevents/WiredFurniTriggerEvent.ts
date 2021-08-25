import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WiredFurniTriggerParser } from '../../parser/roomevents/WiredFurniTriggerParser';

export class WiredFurniTriggerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniTriggerParser);
    }

    public getParser(): WiredFurniTriggerParser
    {
        return this.parser as WiredFurniTriggerParser;
    }
}
