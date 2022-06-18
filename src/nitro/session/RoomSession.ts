import { Disposable } from '../../core/common/disposable/Disposable';
import { IConnection } from '../../core/communication/connections/IConnection';
import { CompostPlantMessageComposer, FurnitureMultiStateComposer, HarvestPetMessageComposer, PetMountComposer, PollAnswerComposer, PollRejectComposer, PollStartComposer, RemovePetSaddleComposer, TogglePetBreedingComposer, TogglePetRidingComposer, UsePetProductComposer } from '../communication';
import { RoomModerationSettings } from '../communication/messages/incoming/roomsettings/RoomModerationSettings';
import { RoomDoorbellAccessComposer } from '../communication/messages/outgoing/room/access/RoomDoorbellAccessComposer';
import { RoomEnterComposer } from '../communication/messages/outgoing/room/access/RoomEnterComposer';
import { RoomAmbassadorAlertComposer } from '../communication/messages/outgoing/room/action/RoomAmbassadorAlertComposer';
import { RoomBanUserComposer } from '../communication/messages/outgoing/room/action/RoomBanUserComposer';
import { RoomGiveRightsComposer } from '../communication/messages/outgoing/room/action/RoomGiveRightsComposer';
import { RoomKickUserComposer } from '../communication/messages/outgoing/room/action/RoomKickUserComposer';
import { RoomMuteUserComposer } from '../communication/messages/outgoing/room/action/RoomMuteUserComposer';
import { RoomTakeRightsComposer } from '../communication/messages/outgoing/room/action/RoomTakeRightsComposer';
import { BotRemoveComposer } from '../communication/messages/outgoing/room/engine/BotRemoveComposer';
import { PetRemoveComposer } from '../communication/messages/outgoing/room/engine/PetRemoveComposer';
import { MoodlightSettingsComposer } from '../communication/messages/outgoing/room/furniture/dimmer/MoodlightSettingsComposer';
import { MoodlightSettingsSaveComposer } from '../communication/messages/outgoing/room/furniture/dimmer/MoodlightSettingsSaveComposer';
import { MoodlightTogggleStateComposer } from '../communication/messages/outgoing/room/furniture/dimmer/MoodlightTogggleStateComposer';
import { OpenPresentComposer } from '../communication/messages/outgoing/room/furniture/presents/OpenPresentComposer';
import { RoomUnitChatComposer } from '../communication/messages/outgoing/room/unit/chat/RoomUnitChatComposer';
import { RoomUnitChatShoutComposer } from '../communication/messages/outgoing/room/unit/chat/RoomUnitChatShoutComposer';
import { RoomUnitChatWhisperComposer } from '../communication/messages/outgoing/room/unit/chat/RoomUnitChatWhisperComposer';
import { RoomUnitTypingStartComposer } from '../communication/messages/outgoing/room/unit/chat/RoomUnitTypingStartComposer';
import { RoomUnitTypingStopComposer } from '../communication/messages/outgoing/room/unit/chat/RoomUnitTypingStopComposer';
import { RoomUnitActionComposer } from '../communication/messages/outgoing/room/unit/RoomUnitActionComposer';
import { RoomUnitDanceComposer } from '../communication/messages/outgoing/room/unit/RoomUnitDanceComposer';
import { RoomUnitPostureComposer } from '../communication/messages/outgoing/room/unit/RoomUnitPostureComposer';
import { RoomUnitSignComposer } from '../communication/messages/outgoing/room/unit/RoomUnitSignComposer';
import { UserMottoComposer } from '../communication/messages/outgoing/user/data/UserMottoComposer';
import { RoomControllerLevel } from './enum/RoomControllerLevel';
import { RoomTradingLevelEnum } from './enum/RoomTradingLevelEnum';
import { RoomSessionEvent } from './events/RoomSessionEvent';
import { IRoomSession } from './IRoomSession';
import { UserDataManager } from './UserDataManager';

export class RoomSession extends Disposable implements IRoomSession
{
    private _connection: IConnection;
    private _userData: UserDataManager;

    private _roomId: number;
    private _password: string;
    private _state: string;
    private _tradeMode: number;
    private _doorMode: number;
    private _allowPets: boolean;
    private _controllerLevel: number;
    private _ownRoomIndex: number;
    private _isGuildRoom: boolean;
    private _isRoomOwner: boolean;
    private _isDecorating: boolean;
    private _isSpectator: boolean;

    private _moderationSettings: RoomModerationSettings;

    constructor()
    {
        super();

        this._connection = null;
        this._userData = new UserDataManager();

        this._roomId = 0;
        this._password = null;
        this._state = RoomSessionEvent.CREATED;
        this._tradeMode = RoomTradingLevelEnum.NO_TRADING;
        this._doorMode = 0;
        this._controllerLevel = RoomControllerLevel.NONE;
        this._ownRoomIndex = -1;
        this._isGuildRoom = false;
        this._isRoomOwner = false;
        this._isDecorating = false;
        this._isSpectator = false;

        this._moderationSettings = null;
    }

    protected onDispose(): void
    {
        if(this._userData)
        {
            this._userData.dispose();

            this._userData = null;
        }

        this._connection = null;
    }

    public setConnection(connection: IConnection): void
    {
        if(this._connection || !connection) return;

        this._connection = connection;

        if(this._userData) this._userData.setConnection(connection);
    }

    public setControllerLevel(level: number): void
    {
        if((level >= RoomControllerLevel.NONE) && (level <= RoomControllerLevel.MODERATOR))
        {
            this._controllerLevel = level;

            return;
        }

        this._controllerLevel = RoomControllerLevel.NONE;
    }

    public setOwnRoomIndex(roomIndex: number): void
    {
        this._ownRoomIndex = roomIndex;
    }

    public setRoomOwner(): void
    {
        this._isRoomOwner = true;
    }

    public start(): boolean
    {
        if(this._state !== RoomSessionEvent.CREATED || !this._connection) return false;

        this._state = RoomSessionEvent.STARTED;

        return this.enterRoom();
    }

    private enterRoom(): boolean
    {
        if(!this._connection) return false;

        this._connection.send(new RoomEnterComposer(this._roomId, this._password));

        return true;
    }

    public reset(roomId: number): void
    {
        if(roomId === this._roomId) return;

        this._roomId = roomId;
    }

    public sendChatMessage(text: string, styleId: number): void
    {
        this._connection.send(new RoomUnitChatComposer(text, styleId));
    }

    public sendShoutMessage(text: string, styleId: number): void
    {
        this._connection.send(new RoomUnitChatShoutComposer(text, styleId));
    }

    public sendWhisperMessage(recipientName: string, text: string, styleId: number): void
    {
        this._connection.send(new RoomUnitChatWhisperComposer(recipientName, text, styleId));
    }

    public sendChatTypingMessage(isTyping: boolean): void
    {
        if(isTyping) this._connection.send(new RoomUnitTypingStartComposer());
        else this._connection.send(new RoomUnitTypingStopComposer());
    }

    public sendMottoMessage(motto: string): void
    {
        this._connection.send(new UserMottoComposer(motto));
    }

    public sendDanceMessage(danceId: number): void
    {
        this._connection.send(new RoomUnitDanceComposer(danceId));
    }

    public sendExpressionMessage(expression: number): void
    {
        this._connection.send(new RoomUnitActionComposer(expression));
    }

    public sendSignMessage(sign: number): void
    {
        if((sign < 0) || (sign > 17)) return;

        this._connection.send(new RoomUnitSignComposer(sign));
    }

    public sendPostureMessage(posture: number): void
    {
        this._connection.send(new RoomUnitPostureComposer(posture));
    }

    public sendDoorbellApprovalMessage(userName: string, flag: boolean): void
    {
        this._connection.send(new RoomDoorbellAccessComposer(userName,flag));
    }

    public sendAmbassadorAlertMessage(userId: number): void
    {
        this._connection.send(new RoomAmbassadorAlertComposer(userId));
    }

    public sendKickMessage(userId: number): void
    {
        this._connection.send(new RoomKickUserComposer(userId));
    }

    public sendMuteMessage(userId: number, minutes: number): void
    {
        this._connection.send(new RoomMuteUserComposer(userId, minutes, this._roomId));
    }

    public sendBanMessage(userId: number, type: string): void
    {
        this._connection.send(new RoomBanUserComposer(userId, this._roomId, type));
    }

    public sendGiveRightsMessage(userId: number): void
    {
        this._connection.send(new RoomGiveRightsComposer(userId));
    }

    public sendTakeRightsMessage(userId: number): void
    {
        this._connection.send(new RoomTakeRightsComposer(userId));
    }

    public sendPollStartMessage(pollId:number):void
    {
        this._connection.send(new PollStartComposer(pollId));
    }

    public sendPollRejectMessage(pollId:number):void
    {
        this._connection.send(new PollRejectComposer(pollId));
    }

    public sendPollAnswerMessage(pollId:number, questionId:number, answers:string[]):void
    {
        this._connection.send(new PollAnswerComposer(pollId, questionId, answers));
    }

    public updateMoodlightData(id: number, effectId: number, color: number, brightness: number, apply: boolean): void
    {
        let colorString = '000000' + color.toString(16).toUpperCase();
        colorString = '#' + colorString.substring((colorString.length - 6));

        this.connection.send(new MoodlightSettingsSaveComposer(id, effectId, colorString, brightness, apply));
    }

    public toggleMoodlightState(): void
    {
        this.connection.send(new MoodlightTogggleStateComposer());
    }

    public pickupPet(id: number): void
    {
        if(!this._connection) return;

        this._connection.send(new PetRemoveComposer(id));
    }

    public pickupBot(id: number): void
    {
        if(!this._connection) return;

        this._connection.send(new BotRemoveComposer(id));
    }

    public requestMoodlightSettings(): void
    {
        if(!this._connection) return;

        this._connection.send(new MoodlightSettingsComposer());
    }

    public openGift(objectId: number): void
    {
        this._connection.send(new OpenPresentComposer(objectId));
    }

    public mountPet(id: number): void
    {
        this._connection.send(new PetMountComposer(id, true));
    }

    public dismountPet(id: number): void
    {
        this._connection.send(new PetMountComposer(id, false));
    }

    public usePetProduct(itemId: number, petId: number): void
    {
        this._connection.send(new UsePetProductComposer(itemId, petId));
    }

    public removePetSaddle(id: number): void
    {
        this._connection.send(new RemovePetSaddleComposer(id));
    }

    public togglePetBreeding(id: number): void
    {
        this._connection.send(new TogglePetBreedingComposer(id));
    }

    public togglePetRiding(id: number): void
    {
        this._connection.send(new TogglePetRidingComposer(id));
    }

    public useMultistateItem(id: number): void
    {
        this._connection.send(new FurnitureMultiStateComposer(id));
    }

    public harvestPet(id: number): void
    {
        this._connection.send(new HarvestPetMessageComposer(id));
    }

    public compostPlant(id: number): void
    {
        this._connection.send(new CompostPlantMessageComposer(id));
    }

    public get connection(): IConnection
    {
        return this._connection;
    }

    public get userDataManager(): UserDataManager
    {
        return this._userData;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public set roomId(roomId: number)
    {
        this._roomId = roomId;
    }

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string)
    {
        this._password = password;
    }

    public get state(): string
    {
        return this._state;
    }

    public get _Str_7411(): boolean
    {
        return true;
    }

    public get tradeMode(): number
    {
        return this._tradeMode;
    }

    public set tradeMode(mode: number)
    {
        this._tradeMode = mode;
    }

    public get doorMode(): number
    {
        return this._doorMode;
    }

    public set doorMode(mode: number)
    {
        this._doorMode = mode;
    }

    public get allowPets(): boolean
    {
        return this._allowPets;
    }

    public set allowPets(flag: boolean)
    {
        this._allowPets = flag;
    }

    public get controllerLevel(): number
    {
        return this._controllerLevel;
    }

    public get ownRoomIndex(): number
    {
        return this._ownRoomIndex;
    }

    public get isGuildRoom(): boolean
    {
        return this._isGuildRoom;
    }

    public set isGuildRoom(flag: boolean)
    {
        this._isGuildRoom = flag;
    }

    public get isRoomOwner(): boolean
    {
        return this._isRoomOwner;
    }

    public get isDecorating(): boolean
    {
        return this._isDecorating;
    }

    public set isDecorating(flag: boolean)
    {
        this._isDecorating = flag;
    }

    public get isSpectator(): boolean
    {
        return this._isSpectator;
    }

    public set isSpectator(flag: boolean)
    {
        this._isSpectator = flag;
    }

    public get moderationSettings(): RoomModerationSettings
    {
        return this._moderationSettings;
    }

    public set moderationSettings(parser: RoomModerationSettings)
    {
        this._moderationSettings = parser;
    }
}
