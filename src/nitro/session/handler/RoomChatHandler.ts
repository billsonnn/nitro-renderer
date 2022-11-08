import { IConnection, IRoomHandlerListener, SystemChatStyleEnum } from '../../../api';
import { RoomSessionChatEvent } from '../../../events';
import { FloodControlEvent, PetRespectNoficationEvent, PetSupplementedNotificationEvent, PetSupplementTypeEnum, RemainingMuteEvent, RespectReceivedEvent, RoomUnitChatEvent, RoomUnitChatShoutEvent, RoomUnitChatWhisperEvent, RoomUnitHandItemReceivedEvent } from '../../communication';
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
        connection.addMessageEvent(new PetRespectNoficationEvent(this.onPetRespectNoficationEvent.bind(this)));
        connection.addMessageEvent(new PetSupplementedNotificationEvent(this.onPetSupplementedNotificationEvent.bind(this)));
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

    private onPetRespectNoficationEvent(event: PetRespectNoficationEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        const petData = session.userDataManager.getPetData(parser.petData.id);

        if(!petData) return;

        let chatType = RoomSessionChatEvent.CHAT_TYPE_PETRESPECT;

        if(parser.isTreat) chatType = RoomSessionChatEvent.CHAT_TYPE_PETTREAT;

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, petData.roomIndex, '', chatType, SystemChatStyleEnum.GENERIC));
    }

    private onPetSupplementedNotificationEvent(event: PetSupplementedNotificationEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        const petData = session.userDataManager.getPetData(parser.petId);

        if(!petData) return;

        let userRoomIndex = -1;

        const userData = session.userDataManager.getUserData(parser.userId);

        if(userData) userRoomIndex = userData.roomIndex;

        let chatType = RoomSessionChatEvent.CHAT_TYPE_PETREVIVE;

        switch(parser.supplementType)
        {
            case PetSupplementTypeEnum.REVIVE:
                chatType = RoomSessionChatEvent.CHAT_TYPE_PETREVIVE;
                break;
            case PetSupplementTypeEnum.REBREED_FERTILIZER:
                chatType = RoomSessionChatEvent.CHAT_TYPE_PET_REBREED_FERTILIZE;
                break;
            case PetSupplementTypeEnum.SPEED_FERTILIZER:
                chatType = RoomSessionChatEvent.CHAT_TYPE_PET_SPEED_FERTILIZE;
                break;
        }

        this.listener.events.dispatchEvent(new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, petData.roomIndex, '', chatType, SystemChatStyleEnum.GENERIC, null, userRoomIndex));
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
