import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { PresentOpenedMessageParser } from '../../../../parser/inventory/furniture/PresentOpenedMessageParser';

export class PresentOpenedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PresentOpenedMessageParser);
    }

    public getParser(): PresentOpenedMessageParser
    {
        return this.parser as PresentOpenedMessageParser;
    }
}
