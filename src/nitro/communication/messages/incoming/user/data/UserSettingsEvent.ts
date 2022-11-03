import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserSettingsParser } from '../../../parser';

export class UserSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsParser);
    }

    public getParser(): UserSettingsParser
    {
        return this.parser as UserSettingsParser;
    }
}
