import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NavigatorSettingsParser } from '../../parser';

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
