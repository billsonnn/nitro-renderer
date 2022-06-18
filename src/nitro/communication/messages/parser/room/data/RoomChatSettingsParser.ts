import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { RoomChatSettings } from '../../../incoming/roomsettings/RoomChatSettings';

export class RoomChatSettingsParser implements IMessageParser
{
    private _chat: RoomChatSettings;

    public flush(): boolean
    {
        this._chat = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._chat = new RoomChatSettings(wrapper);

        return true;
    }

    public get chat(): RoomChatSettings
    {
        return this._chat;
    }
}
