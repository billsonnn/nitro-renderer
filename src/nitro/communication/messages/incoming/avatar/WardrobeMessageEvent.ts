import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WardrobeMessageParser } from '../../parser';

export class WardrobeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WardrobeMessageParser);
    }

    public getParser(): WardrobeMessageParser
    {
        return this.parser as WardrobeMessageParser;
    }
}
