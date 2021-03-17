import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorCategoriesParser } from '../../parser/navigator/NavigatorCategoriesParser';

export class NavigatorCategoriesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorCategoriesParser);
    }

    public getParser(): NavigatorCategoriesParser
    {
        return this.parser as NavigatorCategoriesParser;
    }
}