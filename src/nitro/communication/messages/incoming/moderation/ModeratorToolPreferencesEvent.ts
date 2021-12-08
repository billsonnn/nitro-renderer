import { ModeratorToolPreferencesMessageParser } from '../..';
import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';

export class ModeratorToolPreferencesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorToolPreferencesMessageParser);
    }

    public getParser(): ModeratorToolPreferencesMessageParser
    {
        return this.parser as ModeratorToolPreferencesMessageParser;
    }
}
