import { Resource, Texture } from '@pixi/core';
import { GetAssetManager, IFurnitureData, IFurnitureDataListener, IGroupInformationManager, IMessageComposer, INitroCommunicationManager, INitroEvent, IProductData, IProductDataListener, ISessionDataManager, NitroConfiguration, NoobnessLevelEnum, SecurityLevel } from '../../api';
import { NitroManager } from '../../core';
import { MysteryBoxKeysUpdateEvent, NitroSettingsEvent, SessionDataPreferencesEvent, UserNameUpdateEvent } from '../../events';
import { AccountSafetyLockStatusChangeMessageEvent, AccountSafetyLockStatusChangeParser, AvailabilityStatusMessageEvent, ChangeUserNameResultMessageEvent, EmailStatusResultEvent, FigureUpdateEvent, GetUserTagsComposer, InClientLinkEvent, MysteryBoxKeysEvent, NoobnessLevelMessageEvent, PetRespectComposer, PetScratchFailedMessageEvent, RoomReadyMessageEvent, RoomUnitChatComposer, UserInfoEvent, UserNameChangeMessageEvent, UserPermissionsEvent, UserRespectComposer, UserTagsMessageEvent } from '../communication';
import { Nitro } from '../Nitro';
import { HabboWebTools } from '../utils/HabboWebTools';
import { BadgeImageManager } from './badge/BadgeImageManager';
import { FurnitureDataLoader } from './furniture/FurnitureDataLoader';
import { GroupInformationManager } from './GroupInformationManager';
import { IgnoredUsersManager } from './IgnoredUsersManager';
import { ProductDataLoader } from './product/ProductDataLoader';

export class SessionDataManager extends NitroManager implements ISessionDataManager
{
    private _communication: INitroCommunicationManager;

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

    private _ignoredUsersManager: IgnoredUsersManager;
    private _groupInformationManager: IGroupInformationManager;

    private _clubLevel: number;
    private _securityLevel: number;
    private _isAmbassador: boolean;
    private _noobnessLevel: number;
    private _isEmailVerified: boolean;

    private _systemOpen: boolean;
    private _systemShutdown: boolean;
    private _isAuthenticHabbo: boolean;
    private _isRoomCameraFollowDisabled: boolean;
    private _uiFlags: number;

    private _floorItems: Map<number, IFurnitureData>;
    private _wallItems: Map<number, IFurnitureData>;
    private _products: Map<string, IProductData>;
    private _furnitureData: FurnitureDataLoader;
    private _productData: ProductDataLoader;

    private _furnitureReady: boolean;
    private _productsReady: boolean;
    private _furnitureListenersNotified: boolean;
    private _pendingFurnitureListeners: IFurnitureDataListener[];
    private _pendingProductListeners: IProductDataListener[];
    private _tags: string[];

    private _badgeImageManager: BadgeImageManager;

    constructor(communication: INitroCommunicationManager)
    {
        super();

        this._communication = communication;

        this.resetUserInfo();

        this._ignoredUsersManager = new IgnoredUsersManager(this);
        this._groupInformationManager = new GroupInformationManager(this);

        this._clubLevel = 0;
        this._securityLevel = 0;
        this._isAmbassador = false;
        this._noobnessLevel = -1;
        this._isEmailVerified = false;

        this._systemOpen = false;
        this._systemShutdown = false;
        this._isAuthenticHabbo = false;
        this._isRoomCameraFollowDisabled = false;
        this._uiFlags = 0;

        this._floorItems = new Map();
        this._wallItems = new Map();
        this._products = new Map();
        this._furnitureData = null;

        this._furnitureReady = false;
        this._productsReady = false;
        this._furnitureListenersNotified = false;
        this._pendingFurnitureListeners = [];
        this._pendingProductListeners = [];
        this._tags = [];

        this._badgeImageManager = null;

        this.onFurnitureDataReadyEvent = this.onFurnitureDataReadyEvent.bind(this);
        this.onProductDataReadyEvent = this.onProductDataReadyEvent.bind(this);
        this.onNitroSettingsEvent = this.onNitroSettingsEvent.bind(this);
    }

    protected onInit(): void
    {
        this.loadFurnitureData();
        this.loadProductData();
        this.loadBadgeImageManager();

        (this._ignoredUsersManager && this._ignoredUsersManager.init());
        (this._groupInformationManager && this._groupInformationManager.init());

        this._communication.registerMessageEvent(new FigureUpdateEvent(this.onUserFigureEvent.bind(this)));
        this._communication.registerMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        this._communication.registerMessageEvent(new UserPermissionsEvent(this.onUserPermissionsEvent.bind(this)));
        this._communication.registerMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatusMessageEvent.bind(this)));
        this._communication.registerMessageEvent(new PetScratchFailedMessageEvent(this.onPetRespectFailed.bind(this)));
        this._communication.registerMessageEvent(new ChangeUserNameResultMessageEvent(this.onChangeNameUpdateEvent.bind(this)));
        this._communication.registerMessageEvent(new UserNameChangeMessageEvent(this.onUserNameChangeMessageEvent.bind(this)));
        this._communication.registerMessageEvent(new UserTagsMessageEvent(this.onUserTags.bind(this)));
        this._communication.registerMessageEvent(new RoomReadyMessageEvent(this.onRoomModelNameEvent.bind(this)));
        this._communication.registerMessageEvent(new InClientLinkEvent(this.onInClientLinkEvent.bind(this)));
        this._communication.registerMessageEvent(new MysteryBoxKeysEvent(this.onMysteryBoxKeysEvent.bind(this)));
        this._communication.registerMessageEvent(new NoobnessLevelMessageEvent(this.onNoobnessLevelMessageEvent.bind(this)));
        this._communication.registerMessageEvent(new AccountSafetyLockStatusChangeMessageEvent(this.onAccountSafetyLockStatusChangeMessageEvent.bind(this)));
        this._communication.registerMessageEvent(new EmailStatusResultEvent(this.onEmailStatus.bind(this)));

        Nitro.instance.events.addEventListener(NitroSettingsEvent.SETTINGS_UPDATED, this.onNitroSettingsEvent);
    }

    protected onDispose(): void
    {
        this.destroyFurnitureData();

        if(this._ignoredUsersManager)
        {
            this._ignoredUsersManager.dispose();

            this._ignoredUsersManager = null;
        }

        if(this._groupInformationManager)
        {
            this._groupInformationManager.dispose();

            this._groupInformationManager = null;
        }

        Nitro.instance.events.removeEventListener(NitroSettingsEvent.SETTINGS_UPDATED, this.onNitroSettingsEvent);

        super.onDispose();
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

    private loadFurnitureData(): void
    {
        this.destroyFurnitureData();

        this._furnitureData = new FurnitureDataLoader(this._floorItems, this._wallItems, Nitro.instance.localization);

        this._furnitureData.addEventListener(FurnitureDataLoader.FURNITURE_DATA_READY, this.onFurnitureDataReadyEvent);

        this._furnitureData.loadFurnitureData(NitroConfiguration.getValue<string>('furnidata.url'));
    }

    private loadProductData(): void
    {
        this.destroyProductData();

        this._productData = new ProductDataLoader(this._products);

        this._productData.addEventListener(ProductDataLoader.PDP_PRODUCT_DATA_READY, this.onProductDataReadyEvent);

        this._productData.loadProductData(NitroConfiguration.getValue<string>('productdata.url'));
    }

    private loadBadgeImageManager(): void
    {
        if(this._badgeImageManager) return;

        this._badgeImageManager = new BadgeImageManager(GetAssetManager(), this);
        this._badgeImageManager.init();
    }

    public hasProductData(listener: IProductDataListener): boolean
    {
        if(this._productsReady) return true;

        if(listener && (this._pendingProductListeners.indexOf(listener) === -1)) this._pendingProductListeners.push(listener);

        return false;
    }

    public getAllFurnitureData(listener: IFurnitureDataListener): IFurnitureData[]
    {
        if(!this._furnitureReady)
        {
            if(this._pendingFurnitureListeners.indexOf(listener) === -1) this._pendingFurnitureListeners.push(listener);

            return null;
        }

        const furnitureData: IFurnitureData[] = [];

        for(const data of this._floorItems.values())
        {
            if(!data) continue;

            furnitureData.push(data);
        }

        for(const data of this._wallItems.values())
        {
            if(!data) continue;

            furnitureData.push(data);
        }

        return furnitureData;
    }

    public removePendingFurniDataListener(listener: IFurnitureDataListener): void
    {
        if(!this._pendingFurnitureListeners) return;

        const index = this._pendingFurnitureListeners.indexOf(listener);

        if(index === -1) return;

        this._pendingFurnitureListeners.splice(index, 1);
    }

    private onUserFigureEvent(event: FigureUpdateEvent): void
    {
        if(!event || !event.connection) return;

        this._figure = event.getParser().figure;
        this._gender = event.getParser().gender;

        HabboWebTools.updateFigure(this._figure);
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

        (this._ignoredUsersManager && this._ignoredUsersManager.requestIgnoredUsers());
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

        this.events.dispatchEvent(new UserNameUpdateEvent(parser.name));
    }

    private onUserNameChangeMessageEvent(event: UserNameChangeMessageEvent): void
    {
        if(!event || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.webId !== this.userId) return;

        this._name = parser.newName;
        this._canChangeName = false;

        this.events.dispatchEvent(new UserNameUpdateEvent(this._name));
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

    private onFurnitureDataReadyEvent(event: INitroEvent): void
    {
        this._furnitureData.removeEventListener(FurnitureDataLoader.FURNITURE_DATA_READY, this.onFurnitureDataReadyEvent);

        this._furnitureReady = true;

        if(!this._furnitureListenersNotified)
        {
            this._furnitureListenersNotified = true;

            if(this._pendingFurnitureListeners && this._pendingFurnitureListeners.length)
            {
                for(const listener of this._pendingFurnitureListeners) listener && listener.loadFurnitureData();
            }
        }

        this._pendingProductListeners = [];
    }

    private onProductDataReadyEvent(event: INitroEvent): void
    {
        this._productData.removeEventListener(ProductDataLoader.PDP_PRODUCT_DATA_READY, this.onProductDataReadyEvent);

        this._productsReady = true;

        for(const listener of this._pendingProductListeners) listener && listener.loadProductData();

        this._pendingProductListeners = [];
    }

    private onInClientLinkEvent(event: InClientLinkEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        Nitro.instance.createLinkEvent(parser.link);
    }

    private onMysteryBoxKeysEvent(event: MysteryBoxKeysEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.events.dispatchEvent(new MysteryBoxKeysUpdateEvent(parser.boxColor, parser.keyColor));
    }

    private onNoobnessLevelMessageEvent(event: NoobnessLevelMessageEvent): void
    {
        this._noobnessLevel = event.getParser().noobnessLevel;

        if(this._noobnessLevel !== NoobnessLevelEnum.OLD_IDENTITY)
        {
            NitroConfiguration.setValue<number>('new.identity', 1);
        }
    }

    private onAccountSafetyLockStatusChangeMessageEvent(event: AccountSafetyLockStatusChangeMessageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._safetyLocked = (parser.status == AccountSafetyLockStatusChangeParser.SAFETY_LOCK_STATUS_LOCKED);
    }

    private onEmailStatus(event: EmailStatusResultEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._isEmailVerified = parser.isVerified;
    }

    private onNitroSettingsEvent(event: NitroSettingsEvent): void
    {
        this._isRoomCameraFollowDisabled = event.cameraFollow;
        this._uiFlags = event.flags;

        this.events.dispatchEvent(new SessionDataPreferencesEvent(this._uiFlags));
    }

    private destroyFurnitureData(): void
    {
        if(!this._furnitureData) return;

        this._furnitureData.dispose();

        this._furnitureData = null;
    }

    private destroyProductData(): void
    {
        if(!this._productData) return;

        this._productData.dispose();

        this._productData = null;
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
    }

    public getProductData(type: string): IProductData
    {
        if(!this._productsReady) this.loadProductData();

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

    public getBadgeImage(name: string): Texture<Resource>
    {
        return this._badgeImageManager.getBadgeImage(name);
    }

    public getGroupBadgeImage(name: string): Texture<Resource>
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
        return this._securityLevel >= level;
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
        (this._ignoredUsersManager && this._ignoredUsersManager.ignoreUser(name));
    }

    public unignoreUser(name: string): void
    {
        (this._ignoredUsersManager && this._ignoredUsersManager.unignoreUser(name));
    }

    public isUserIgnored(name: string): boolean
    {
        return (this._ignoredUsersManager && this._ignoredUsersManager.isIgnored(name));
    }

    public getGroupBadge(groupId: number): string
    {
        return (this._groupInformationManager && this._groupInformationManager.getGroupBadge(groupId));
    }

    public send(composer: IMessageComposer<unknown[]>): void
    {
        this._communication.connection.send(composer);
    }

    public get communication(): INitroCommunicationManager
    {
        return this._communication;
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
