import { IMessageEvent, MessageEvent } from '../../../../../core';
import { NavigatorSettingsParser } from '../../parser/navigator/NavigatorSettingsParser';

export class NavigatorSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSettingsParser);
    }

    public getParser(): NavigatorSettingsParser
    {
        return this.parser as NavigatorSettingsParser;
    }
}
