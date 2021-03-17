import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GroupSettingsParser } from '../../parser/group/GroupSettingsParser';

export class GroupSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupSettingsParser);
    }

    public getParser(): GroupSettingsParser
    {
        return this.parser as GroupSettingsParser;
    }
}
