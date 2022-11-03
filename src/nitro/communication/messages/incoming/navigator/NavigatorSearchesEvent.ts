import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NavigatorSearchesParser } from '../../parser';

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
