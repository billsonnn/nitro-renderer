import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { RoomChatParser } from './RoomChatParser';
import { RoomDataParser } from './RoomDataParser';
import { RoomModerationParser } from './RoomModerationParser';

export class RoomInfoParser implements IMessageParser
{
    private _roomEnter: boolean;
    private _roomForward: boolean;
    private _staffPick: boolean;
    private _data: RoomDataParser;
    private _isGroupMember: boolean;
    private _moderation: RoomModerationParser;
    private _chat: RoomChatParser;

    public flush(): boolean
    {
        this._roomEnter     = false;
        this._roomForward   = false;
        this._staffPick     = false;
        this._data          = null;
        this._isGroupMember = false;
        this._moderation    = null;
        this._chat          = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomEnter      = wrapper.readBoolean();
        this._data           = new RoomDataParser(wrapper);
        this._roomForward    = wrapper.readBoolean();
        this.data.roomPicker = wrapper.readBoolean();
        this._isGroupMember  = wrapper.readBoolean();
        this.data.allInRoomMuted          = wrapper.readBoolean();
        this._moderation     = new RoomModerationParser(wrapper);
        this.data.canMute   = wrapper.readBoolean();
        this._chat           = new RoomChatParser(wrapper);

        return true;
    }

    public get roomEnter(): boolean
    {
        return this._roomEnter;
    }

    public get roomForward(): boolean
    {
        return this._roomForward;
    }

    public get data(): RoomDataParser
    {
        return this._data;
    }

    public get isGroupMember(): boolean
    {
        return this._isGroupMember;
    }

    public get moderation(): RoomModerationParser
    {
        return this._moderation;
    }

    public get chat(): RoomChatParser
    {
        return this._chat;
    }
}
