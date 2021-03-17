import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorCollapsedParser } from '../../parser/navigator/NavigatorCollapsedParser';

export class NavigatorCollapsedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorCollapsedParser);
    }

    public getParser(): NavigatorCollapsedParser
    {
        return this.parser as NavigatorCollapsedParser;
    }
}