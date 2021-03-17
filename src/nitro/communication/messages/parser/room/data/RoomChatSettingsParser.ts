import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { RoomChatParser } from './RoomChatParser';

export class RoomChatSettingsParser implements IMessageParser
{
    private _chat: RoomChatParser;

    public flush(): boolean
    {
        this._chat = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._chat = new RoomChatParser(wrapper);

        return true;
    }

    public get chat(): RoomChatParser
    {
        return this._chat;
    }
}