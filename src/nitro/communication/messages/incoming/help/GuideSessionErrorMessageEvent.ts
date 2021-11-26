import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionErrorMessageParser } from '../../parser/help/GuideSessionErrorMessageParser';

export class GuideSessionErrorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionErrorMessageParser);
    }

    public getParser(): GuideSessionErrorMessageParser
    {
        return this.parser as GuideSessionErrorMessageParser;
    }
}
