import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionMessageMessageParser } from '../../parser/help/GuideSessionMessageMessageParser';

export class GuideSessionMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionMessageMessageParser);
    }

    public getParser(): GuideSessionMessageMessageParser
    {
        return this.parser as GuideSessionMessageMessageParser;
    }
}
