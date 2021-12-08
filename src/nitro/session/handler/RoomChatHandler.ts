import { IConnection } from '../../../core/communication/connections/IConnection';
import { FloodControlEvent } from '../../communication/messages/incoming/room/unit/chat/FloodControlEvent';
import { RemainingMuteEvent } from '../../communication/messages/incoming/room/unit/chat/RemainingMuteEvent';
import { RoomUnitChatEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatEvent';
import { RoomUnitChatShoutEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatShoutEvent';
import { RoomUnitChatWhisperEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatWhisperEvent';
import { RoomUnitHandItemReceivedEvent } from '../../communication/messages/incoming/room/unit/RoomUnitHandItemReceivedEvent';
import { RespectReceivedEvent } from '../../communication/messages/incoming/user/RespectReceivedEvent';
import { SystemChatStyleEnum } from '../../ui/widget/enums/SystemChatStyleEnum';
import { RoomSessionChatEvent } from '../events/RoomSessionChatEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomChatHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomUnitChatEvent(this.onRoomUnitChatEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitChatShoutEvent(this.onRoomUnitChatEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitChatWhisperEvent(this.onRoomUnitChatEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitHandItemReceivedEvent(this.onRoomUnitHandItemReceivedEvent.bind(this)));
        connection.addMessageEvent(new RespectReceivedEvent(this.onRespectReceivedEvent.bind(this)));
        connection.addMessageEvent(new FloodControlEvent(this.onFloodControlEvent.bind(this)));
        connection.addMessageEvent(new RemainingMuteEvent(this.onRemainingMuteEvent.bind(this)));
    }

    private onRoomUnitChatEvent(event: RoomUnitChatEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        let chatType: number = RoomSessionChatEvent.CHAT_TYPE_SPEAK;

        if(event instanceof RoomUnitChatShoutEvent) chatType = RoomSessionChatEvent.CHAT_TYPE_SHOUT;
        else if(event instanceof RoomUnitChatWhisperEvent) chatType = RoomSessionChatEvent.CHAT_TYPE_WHISPER;

        const chatEvent = new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, parser.roomIndex, parser.message, chatType, parser.bubble);

        this.listener.events.dispatchEvent(chatEvent);
    }

    private onRoomUnitHandItemReceivedEvent(event: RoomUnitHandItemReceivedEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, parser.giverUserId, '', RoomSessionChatEvent.CHAT_TYPE_HAND_ITEM_RECEIVED, SystemChatStyleEnum.GENERIC, null, parser.handItemType));
    }

    private onRespectReceivedEvent(event: RespectReceivedEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        const userData = session.userDataManager.getUserData(parser.userId);

        if(!userData) return;

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, userData.roomIndex, '', RoomSessionChatEvent.CHAT_TYPE_RESPECT, SystemChatStyleEnum.GENERIC));
    }

    private onFloodControlEvent(event: FloodControlEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        const seconds = parser.seconds;

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.FLOOD_EVENT, session, -1, seconds.toString(), 0, 0));
    }

    private onRemainingMuteEvent(event: RemainingMuteEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, session.ownRoomIndex, '', RoomSessionChatEvent.CHAT_TYPE_MUTE_REMAINING, SystemChatStyleEnum.GENERIC, null, parser.seconds));
    }
}
