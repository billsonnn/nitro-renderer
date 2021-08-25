import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WiredValidationErrorParser } from '../../parser/roomevents/WiredValidationErrorParser';

export class WiredValidationErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredValidationErrorParser);
    }

    public getParser(): WiredValidationErrorParser
    {
        return this.parser as WiredValidationErrorParser;
    }
}
