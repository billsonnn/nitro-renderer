import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserSettingsParser } from '../../../parser/user/data/UserSettingsParser';

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
