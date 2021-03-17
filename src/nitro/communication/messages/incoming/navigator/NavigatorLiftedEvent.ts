import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorLiftedParser } from '../../parser/navigator/NavigatorLiftedParser';

export class NavigatorLiftedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorLiftedParser);
    }

    public getParser(): NavigatorLiftedParser
    {
        return this.parser as NavigatorLiftedParser;
    }
}