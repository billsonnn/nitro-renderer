import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModeratorUserInfoMessageParser } from '../../parser/moderation/ModeratorUserInfoMessageParser';

export class ModeratorUserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorUserInfoMessageParser);
    }

    public getParser(): ModeratorUserInfoMessageParser
    {
        return this.parser as ModeratorUserInfoMessageParser;
    }
}
