import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { UserSongDisksInventoryMessageParser } from '../../parser';

export class UserSongDisksInventoryMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSongDisksInventoryMessageParser);
    }

    public getParser(): UserSongDisksInventoryMessageParser
    {
        return this.parser as UserSongDisksInventoryMessageParser;
    }
}
