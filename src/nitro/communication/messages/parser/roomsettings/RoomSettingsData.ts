import { BannedUserData } from './BannedUserData';
import { FlatControllerData } from './FlatControllerData';
import { RoomChatSettings } from './RoomChatSettings';
import { RoomModerationSettings } from './RoomModerationSettings';

export class RoomSettingsData
{
    public static DOORMODE_OPEN: number = 0;
    public static DOORMODE_CLOSED: number = 1;
    public static DOORMODE_PASSWORD: number = 2;
    public static DOORMODE_INVISIBLE: number = 3;
    public static DOORMODE_NOOBS_ONLY: number = 4;
    public static TRADEMODE_NOT_ALLOWED: number = 0;
    public static TRADEMODE_WITH_CONTROLLER: number = 1;
    public static TRADEMODE_ALLOWED: number = 2;

    private _roomId: number = -1;
    private _name: string = null;
    private _description: string = null;
    private _doorMode: number = RoomSettingsData.DOORMODE_OPEN;
    private _categoryId: number = -1;
    private _maximumVisitors: number = 0;
    private _maximumVisitorsLimit: number = 0;
    private _tags: string[] = [];
    private _tradeMode: number = RoomSettingsData.TRADEMODE_NOT_ALLOWED;
    private _allowPets: boolean = false;
    private _allowFoodConsume: boolean = false;
    private _allowWalkThrough: boolean = false;
    private _hideWalls: boolean = false;
    private _wallThickness: number = 0;
    private _floorThickness: number = 0;
    private _controllersById: Map<number, FlatControllerData> = new Map();
    private _controllerList: FlatControllerData[] = null;
    private _highlightedUserId: number = -1;
    private _bannedUsersById: Map<number, BannedUserData> = new Map();
    private _bannedUsersList: BannedUserData[] = null;
    private _roomModerationSettings: RoomModerationSettings = null;
    private _chatSettings: RoomChatSettings = null;
    private _allowNavigatorDynamicCats: boolean = false;

    public static from(settings: RoomSettingsData)
    {
        const instance = new RoomSettingsData();

        instance._roomId = settings._roomId;
        instance._name = settings._name;
        instance._description = settings._description;
        instance._doorMode = settings._doorMode;
        instance._categoryId = settings._categoryId;
        instance._maximumVisitors = settings._maximumVisitors;
        instance._maximumVisitorsLimit = settings._maximumVisitorsLimit;
        instance._tags = settings._tags;
        instance._tradeMode = settings._tradeMode;
        instance._allowPets = settings._allowPets;
        instance._allowFoodConsume = settings._allowFoodConsume;
        instance._allowWalkThrough = settings._allowWalkThrough;
        instance._hideWalls = settings._hideWalls;
        instance._wallThickness = settings._wallThickness;
        instance._floorThickness = settings._floorThickness;
        instance._controllersById = settings._controllersById;
        instance._controllerList = settings._controllerList;
        instance._highlightedUserId = settings._highlightedUserId;
        instance._bannedUsersById = settings._bannedUsersById;
        instance._bannedUsersList = settings._bannedUsersList;
        instance._roomModerationSettings = settings._roomModerationSettings;
        instance._chatSettings = settings._chatSettings;
        instance._allowNavigatorDynamicCats = settings._allowNavigatorDynamicCats;

        return instance;
    }

    public static getDoorModeLocalizationKey(k: number): string
    {
        switch(k)
        {
            case RoomSettingsData.DOORMODE_OPEN:
                return '${navigator.door.mode.open}';
            case RoomSettingsData.DOORMODE_CLOSED:
                return '${navigator.door.mode.closed}';
            case RoomSettingsData.DOORMODE_PASSWORD:
                return '${navigator.door.mode.password}';
            case RoomSettingsData.DOORMODE_INVISIBLE:
                return '${navigator.door.mode.invisible}';
            case RoomSettingsData.DOORMODE_NOOBS_ONLY:
                return '${navigator.door.mode.noobs_only}';
        }
        return '';
    }

    public get tradeMode(): number
    {
        return this._tradeMode;
    }

    public set tradeMode(mode: number)
    {
        this._tradeMode = mode;
    }

    public get allowPets(): boolean
    {
        return this._allowPets;
    }

    public set allowPets(flag: boolean)
    {
        this._allowPets = flag;
    }

    public get allowFoodConsume(): boolean
    {
        return this._allowFoodConsume;
    }

    public set allowFoodConsume(flag: boolean)
    {
        this._allowFoodConsume = flag;
    }

    public get allowWalkThrough(): boolean
    {
        return this._allowWalkThrough;
    }

    public set allowWalkThrough(flag: boolean)
    {
        this._allowWalkThrough = flag;
    }

    public get hideWalls(): boolean
    {
        return this._hideWalls;
    }

    public set hideWalls(flag: boolean)
    {
        this._hideWalls = flag;
    }

    public get wallThickness(): number
    {
        return this._wallThickness;
    }

    public set wallThickness(thickness: number)
    {
        this._wallThickness = thickness;
    }

    public get floorThickness(): number
    {
        return this._floorThickness;
    }

    public set floorThickness(thickness: number)
    {
        this._floorThickness = thickness;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public set roomId(id: number)
    {
        this._roomId = id;
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(name: string)
    {
        this._name = name;
    }

    public get description(): string
    {
        return this._description;
    }

    public set description(description: string)
    {
        this._description = description;
    }

    public get doorMode(): number
    {
        return this._doorMode;
    }

    public set doorMode(mode: number)
    {
        this._doorMode = mode;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public set categoryId(id: number)
    {
        this._categoryId = id;
    }

    public get maximumVisitors(): number
    {
        return this._maximumVisitors;
    }

    public set maximumVisitors(max: number)
    {
        this._maximumVisitors = max;
    }

    public get maximumVisitorsLimit(): number
    {
        return this._maximumVisitorsLimit;
    }

    public set maximumVisitorsLimit(limit: number)
    {
        this._maximumVisitorsLimit = limit;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public set tags(tags: string[])
    {
        this._tags = tags;
    }

    public setFlatController(id: number, data: FlatControllerData): void
    {
        this._controllersById.set(id, data);

        this._controllerList = null;
        this._highlightedUserId = id;
    }

    public get roomModerationSettings(): RoomModerationSettings
    {
        return this._roomModerationSettings;
    }

    public set roomModerationSettings(settings: RoomModerationSettings)
    {
        this._roomModerationSettings = settings;
    }

    public get controllersById(): Map<number, FlatControllerData>
    {
        return this._controllersById;
    }

    public set controllersById(controllers: Map<number, FlatControllerData>)
    {
        this._controllersById = controllers;
    }

    public get controllerList(): FlatControllerData[]
    {
        if(!this._controllerList)
        {
            this._controllerList = [];

            for(const controllerData of this._controllersById.values()) this._controllerList.push(controllerData);

            this._controllerList.sort((a, b) => a.userName.localeCompare(b.userName));
        }

        return this._controllerList;
    }

    public get highlightedUserId(): number
    {
        return this._highlightedUserId;
    }

    public setBannedUser(id: number, data: BannedUserData): void
    {
        this._bannedUsersById.set(id, data);

        this._bannedUsersList = null;
    }

    public get bannedUsersById(): Map<number, BannedUserData>
    {
        return this._bannedUsersById;
    }

    public get bannedUsersList(): BannedUserData[]
    {
        if(!this._bannedUsersList)
        {
            this._bannedUsersList = [];

            for(const bannedUserData of this._bannedUsersById.values()) this._bannedUsersList.push(bannedUserData);

            this._bannedUsersList.sort((a, b) => a.userName.localeCompare(b.userName));
        }

        return this._bannedUsersList;
    }

    public get chatSettings(): RoomChatSettings
    {
        return this._chatSettings;
    }

    public set chatSettings(settings: RoomChatSettings)
    {
        this._chatSettings = settings;
    }

    public get allowNavigatorDynamicCats(): boolean
    {
        return this._allowNavigatorDynamicCats;
    }

    public set allowNavigatorDynamicCats(flag: boolean)
    {
        this._allowNavigatorDynamicCats = flag;
    }
}
