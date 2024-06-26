import { ICommunicationManager, IFurnitureData, IGroupInformationManager, IMessageComposer, IProductData, ISessionDataManager, NoobnessLevelEnum, SecurityLevel } from '@nitrots/api';
import { AccountSafetyLockStatusChangeMessageEvent, AccountSafetyLockStatusChangeParser, AvailabilityStatusMessageEvent, ChangeUserNameResultMessageEvent, EmailStatusResultEvent, FigureUpdateEvent, GetCommunication, GetUserTagsComposer, InClientLinkEvent, MysteryBoxKeysEvent, NoobnessLevelMessageEvent, PetRespectComposer, PetScratchFailedMessageEvent, RoomReadyMessageEvent, RoomUnitChatComposer, UserInfoEvent, UserNameChangeMessageEvent, UserPermissionsEvent, UserRespectComposer, UserTagsMessageEvent } from '@nitrots/communication';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, MysteryBoxKeysUpdateEvent, NitroSettingsEvent, SessionDataPreferencesEvent, UserNameUpdateEvent } from '@nitrots/events';
import { CreateLinkEvent, HabboWebTools } from '@nitrots/utils';
import { Texture } from 'pixi.js';
import { GroupInformationManager } from './GroupInformationManager';
import { IgnoredUsersManager } from './IgnoredUsersManager';
import { BadgeImageManager } from './badge/BadgeImageManager';
import { FurnitureDataLoader } from './furniture/FurnitureDataLoader';
import { ProductDataLoader } from './product/ProductDataLoader';

export class SessionDataManager implements ISessionDataManager
{
    private _userId: number;
    private _name: string;
    private _figure: string;
    private _gender: string;
    private _realName: string;
    private _respectsReceived: number;
    private _respectsLeft: number;
    private _respectsPetLeft: number;
    private _canChangeName: boolean;
    private _safetyLocked: boolean;

    private _ignoredUsersManager: IgnoredUsersManager = new IgnoredUsersManager();
    private _groupInformationManager: IGroupInformationManager = new GroupInformationManager();

    private _clubLevel: number = 0;
    private _securityLevel: number = 0;
    private _isAmbassador: boolean = false;
    private _noobnessLevel: number = -1;
    private _isEmailVerified: boolean = false;

    private _systemOpen: boolean = false;
    private _systemShutdown: boolean = false;
    private _isAuthenticHabbo: boolean = false;
    private _isRoomCameraFollowDisabled: boolean = false;
    private _uiFlags: number = 0;

    private _floorItems: Map<number, IFurnitureData> = new Map();
    private _wallItems: Map<number, IFurnitureData> = new Map();
    private _products: Map<string, IProductData> = new Map();
    private _furnitureData: FurnitureDataLoader = new FurnitureDataLoader(this._floorItems, this._wallItems);
    private _productData: ProductDataLoader = new ProductDataLoader(this._products);
    private _tags: string[] = [];

    private _badgeImageManager: BadgeImageManager = new BadgeImageManager();

    constructor()
    {
        this.resetUserInfo();
    }

    public async init(): Promise<void>
    {
        await Promise.all([
            this._furnitureData.init(),
            this._productData.init(),
            this._badgeImageManager.init(),
            this._ignoredUsersManager.init(),
            this._groupInformationManager.init()
        ]);

        GetCommunication().registerMessageEvent(new FigureUpdateEvent((event: FigureUpdateEvent) =>
        {
            this._figure = event.getParser().figure;
            this._gender = event.getParser().gender;

            HabboWebTools.updateFigure(this._figure);
        }));

        GetCommunication().registerMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        GetCommunication().registerMessageEvent(new UserPermissionsEvent(this.onUserPermissionsEvent.bind(this)));
        GetCommunication().registerMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatusMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new PetScratchFailedMessageEvent(this.onPetRespectFailed.bind(this)));
        GetCommunication().registerMessageEvent(new ChangeUserNameResultMessageEvent(this.onChangeNameUpdateEvent.bind(this)));
        GetCommunication().registerMessageEvent(new UserNameChangeMessageEvent(this.onUserNameChangeMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new UserTagsMessageEvent(this.onUserTags.bind(this)));
        GetCommunication().registerMessageEvent(new RoomReadyMessageEvent(this.onRoomModelNameEvent.bind(this)));
        GetCommunication().registerMessageEvent(new InClientLinkEvent(this.onInClientLinkEvent.bind(this)));
        GetCommunication().registerMessageEvent(new MysteryBoxKeysEvent(this.onMysteryBoxKeysEvent.bind(this)));
        GetCommunication().registerMessageEvent(new NoobnessLevelMessageEvent(this.onNoobnessLevelMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new AccountSafetyLockStatusChangeMessageEvent(this.onAccountSafetyLockStatusChangeMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new EmailStatusResultEvent(this.onEmailStatus.bind(this)));

        GetEventDispatcher().addEventListener<NitroSettingsEvent>(NitroSettingsEvent.SETTINGS_UPDATED, event =>
        {
            this._isRoomCameraFollowDisabled = event.cameraFollow;
            this._uiFlags = event.flags;

            GetEventDispatcher().dispatchEvent(new SessionDataPreferencesEvent(this._uiFlags));
        });
    }

    private resetUserInfo(): void
    {
        this._userId = 0;
        this._name = null;
        this._figure = null;
        this._gender = null;
        this._realName = null;
        this._canChangeName = false;
        this._safetyLocked = false;
    }

    public getAllFurnitureData(): IFurnitureData[]
    {
        return [ ...Array.from(this._floorItems.values()), ...Array.from(this._wallItems.values()) ];
    }

    private onUserInfoEvent(event: UserInfoEvent): void
    {
        if(!event || !event.connection) return;

        this.resetUserInfo();

        const userInfo = event.getParser().userInfo;

        if(!userInfo) return;

        this._userId = userInfo.userId;
        this._name = userInfo.username;
        this._figure = userInfo.figure;
        this._gender = userInfo.gender;
        this._realName = userInfo.realName;
        this._respectsReceived = userInfo.respectsReceived;
        this._respectsLeft = userInfo.respectsRemaining;
        this._respectsPetLeft = userInfo.respectsPetRemaining;
        this._canChangeName = userInfo.canChangeName;
        this._safetyLocked = userInfo.safetyLocked;

        this._ignoredUsersManager.requestIgnoredUsers(userInfo.username);
    }

    private onUserPermissionsEvent(event: UserPermissionsEvent): void
    {
        if(!event || !event.connection) return;

        this._clubLevel = event.getParser().clubLevel;
        this._securityLevel = event.getParser().securityLevel;
        this._isAmbassador = event.getParser().isAmbassador;
    }

    private onAvailabilityStatusMessageEvent(event: AvailabilityStatusMessageEvent): void
    {
        if(!event || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        this._systemOpen = parser.isOpen;
        this._systemShutdown = parser.onShutdown;
        this._isAuthenticHabbo = parser.isAuthenticUser;
    }

    private onPetRespectFailed(event: PetScratchFailedMessageEvent): void
    {
        if(!event || !event.connection) return;

        this._respectsPetLeft++;
    }

    private onChangeNameUpdateEvent(event: ChangeUserNameResultMessageEvent): void
    {
        if(!event || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.resultCode !== ChangeUserNameResultMessageEvent.NAME_OK) return;

        this._canChangeName = false;

        GetEventDispatcher().dispatchEvent(new UserNameUpdateEvent(parser.name));
    }

    private onUserNameChangeMessageEvent(event: UserNameChangeMessageEvent): void
    {
        if(!event || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.webId !== this.userId) return;

        this._name = parser.newName;
        this._canChangeName = false;

        GetEventDispatcher().dispatchEvent(new UserNameUpdateEvent(this._name));
    }

    private onUserTags(event: UserTagsMessageEvent): void
    {
        if(!event || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        this._tags = parser.tags;
    }

    private onRoomModelNameEvent(event: RoomReadyMessageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        HabboWebTools.roomVisited(parser.roomId);
    }

    private onInClientLinkEvent(event: InClientLinkEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        CreateLinkEvent(parser.link);
    }

    private onMysteryBoxKeysEvent(event: MysteryBoxKeysEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        GetEventDispatcher().dispatchEvent(new MysteryBoxKeysUpdateEvent(parser.boxColor, parser.keyColor));
    }

    private onNoobnessLevelMessageEvent(event: NoobnessLevelMessageEvent): void
    {
        this._noobnessLevel = event.getParser().noobnessLevel;

        if(this._noobnessLevel !== NoobnessLevelEnum.OLD_IDENTITY) GetConfiguration().setValue<number>('new.identity', 1);
    }

    private onAccountSafetyLockStatusChangeMessageEvent(event: AccountSafetyLockStatusChangeMessageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._safetyLocked = (parser.status === AccountSafetyLockStatusChangeParser.SAFETY_LOCK_STATUS_LOCKED);
    }

    private onEmailStatus(event: EmailStatusResultEvent): void
    {
        this._isEmailVerified = event?.getParser()?.isVerified ?? false;
    }

    public getFloorItemData(id: number): IFurnitureData
    {
        const existing = this._floorItems.get(id);

        if(!existing) return null;

        return existing;
    }

    public getFloorItemDataByName(name: string): IFurnitureData
    {
        if(!name || !this._floorItems || !this._floorItems.size) return null;

        for(const item of this._floorItems.values())
        {
            if(!item || (item.className !== name)) continue;

            return item;
        }

        return null;
    }

    public getWallItemData(id: number): IFurnitureData
    {
        const existing = this._wallItems.get(id);

        if(!existing) return null;

        return existing;
    }

    public getWallItemDataByName(name: string): IFurnitureData
    {
        if(!name || !this._wallItems || !this._wallItems.size) return null;

        for(const item of this._wallItems.values())
        {
            if(!item || (item.className !== name)) continue;

            return item;
        }

        return null;
    }

    public getProductData(type: string): IProductData
    {
        return this._products.get(type);
    }

    public getBadgeUrl(name: string): string
    {
        return this._badgeImageManager.getBadgeUrl(name);
    }

    public getGroupBadgeUrl(name: string): string
    {
        return this._badgeImageManager.getBadgeUrl(name, BadgeImageManager.GROUP_BADGE);
    }

    public getBadgeImage(name: string): Texture
    {
        return this._badgeImageManager.getBadgeImage(name);
    }

    public getGroupBadgeImage(name: string): Texture
    {
        return this._badgeImageManager.getBadgeImage(name, BadgeImageManager.GROUP_BADGE);
    }

    public getUserTags(roomUnitId: number): string[]
    {
        if(roomUnitId < 0) return;

        this.send(new GetUserTagsComposer(roomUnitId));
    }

    public loadBadgeImage(name: string): string
    {
        return this._badgeImageManager.loadBadgeImage(name);
    }

    public loadGroupBadgeImage(name: string): string
    {
        return this._badgeImageManager.loadBadgeImage(name, BadgeImageManager.GROUP_BADGE);
    }

    public hasSecurity(level: number): boolean
    {
        return (this._securityLevel >= level);
    }

    public giveRespect(userId: number): void
    {
        if((userId < 0) || (this._respectsLeft <= 0)) return;

        this.send(new UserRespectComposer(userId));

        this._respectsLeft--;
    }

    public givePetRespect(petId: number): void
    {
        if((petId < 0) || (this._respectsPetLeft <= 0)) return;

        this.send(new PetRespectComposer(petId));

        this._respectsPetLeft--;
    }

    public sendSpecialCommandMessage(text: string, styleId: number = 0): void
    {
        this.send(new RoomUnitChatComposer(text));
    }

    public ignoreUser(name: string): void
    {
        this._ignoredUsersManager.ignoreUser(name);
    }

    public unignoreUser(name: string): void
    {
        this._ignoredUsersManager.unignoreUser(name);
    }

    public isUserIgnored(name: string): boolean
    {
        return this._ignoredUsersManager.isIgnored(name);
    }

    public getGroupBadge(groupId: number): string
    {
        return this._groupInformationManager.getGroupBadge(groupId);
    }

    public send(composer: IMessageComposer<unknown[]>): void
    {
        GetCommunication().connection.send(composer);
    }

    public get communication(): ICommunicationManager
    {
        return GetCommunication();
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._name;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get realName(): string
    {
        return this._realName;
    }

    public get ignoredUsersManager(): IgnoredUsersManager
    {
        return this._ignoredUsersManager;
    }

    public get groupInformationManager(): IGroupInformationManager
    {
        return this._groupInformationManager;
    }

    public get respectsReceived(): number
    {
        return this._respectsReceived;
    }

    public get respectsLeft(): number
    {
        return this._respectsLeft;
    }

    public get respectsPetLeft(): number
    {
        return this._respectsPetLeft;
    }

    public get canChangeName(): boolean
    {
        return this._canChangeName;
    }

    public get clubLevel(): number
    {
        return this._clubLevel;
    }

    public get securityLevel(): number
    {
        return this._securityLevel;
    }

    public get isAmbassador(): boolean
    {
        return this._isAmbassador;
    }

    public get isEmailVerified(): boolean
    {
        return this._isEmailVerified;
    }

    public get isNoob(): boolean
    {
        return (this._noobnessLevel !== NoobnessLevelEnum.OLD_IDENTITY);
    }

    public get isRealNoob(): boolean
    {
        return (this._noobnessLevel === NoobnessLevelEnum.REAL_NOOB);
    }

    public get isSystemOpen(): boolean
    {
        return this._systemOpen;
    }

    public get isSystemShutdown(): boolean
    {
        return this._systemShutdown;
    }

    public get isAuthenticHabbo(): boolean
    {
        return this._isAuthenticHabbo;
    }

    public get isModerator(): boolean
    {
        return (this._securityLevel >= SecurityLevel.MODERATOR);
    }

    public get isCameraFollowDisabled(): boolean
    {
        return this._isRoomCameraFollowDisabled;
    }

    public get uiFlags(): number
    {
        return this._uiFlags;
    }

    public get tags(): string[]
    {
        return this._tags;
    }
}
