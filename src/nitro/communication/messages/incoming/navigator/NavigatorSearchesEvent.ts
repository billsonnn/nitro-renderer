import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { NavigatorSearchesParser } from '../../parser/navigator/NavigatorSearchesParser';

export class NavigatorSearchesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchesParser);
    }

    public getParser(): NavigatorSearchesParser
    {
        return this.parser as NavigatorSearchesParser;
    }
}
