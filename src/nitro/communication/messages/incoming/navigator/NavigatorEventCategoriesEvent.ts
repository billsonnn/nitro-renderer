import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorEventCategoriesParser } from '../../parser/navigator/NavigatorEventCategoriesParser';

export class NavigatorEventCategoriesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorEventCategoriesParser);
    }

    public getParser(): NavigatorEventCategoriesParser
    {
        return this.parser as NavigatorEventCategoriesParser;
    }
}