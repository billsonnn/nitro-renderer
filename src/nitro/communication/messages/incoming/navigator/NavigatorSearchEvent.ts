import { IMessageEvent, MessageEvent } from '../../../../../core';
import { NavigatorSearchParser } from '../../parser/navigator/NavigatorSearchParser';

export class NavigatorSearchEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchParser);
    }

    public getParser(): NavigatorSearchParser
    {
        return this.parser as NavigatorSearchParser;
    }
}
