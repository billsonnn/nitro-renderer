import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WiredSaveSuccessParser } from '../../parser/roomevents/WiredSaveSuccessParser';

export class WiredSaveSuccessEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredSaveSuccessParser);
    }

    public getParser(): WiredSaveSuccessParser
    {
        return this.parser as WiredSaveSuccessParser;
    }
}
