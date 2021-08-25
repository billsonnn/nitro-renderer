import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { InterstitialMessageParser } from '../../parser';

export class InterstitialMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InterstitialMessageParser);
    }

    public getParser(): InterstitialMessageParser
    {
        return this.parser as InterstitialMessageParser;
    }
}
