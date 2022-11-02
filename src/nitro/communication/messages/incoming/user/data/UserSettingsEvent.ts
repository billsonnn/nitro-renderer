import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
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
