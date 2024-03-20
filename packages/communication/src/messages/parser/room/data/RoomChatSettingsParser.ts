import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { RoomChatSettings } from '../../roomsettings';

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
