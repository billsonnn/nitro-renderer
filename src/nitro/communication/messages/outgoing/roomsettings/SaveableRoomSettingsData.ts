export class SaveableRoomSettingsData
{
    private _roomId: number;
    private _name: string;
    private _description: string;
    private _doorMode: number;
    private _password: string;
    private _categoryId: number;
    private _maximumVisitors: number;
    private _tags: string[];
    private _tradeMode: number;
    private _allowPets: boolean;
    private _allowFoodConsume: boolean;
    private _allowWalkThrough: boolean;
    private _allowNavigatorDynCats: boolean;
    private _hideWalls: boolean;
    private _wallThickness: number;
    private _floorThickness: number;
    private _whoCanMute: number;
    private _whoCanKick: number;
    private _whoCanBan: number;
    private _chatMode: number;
    private _chatBubbleSize: number;
    private _chatScrollUpFrequency: number;
    private _chatFullHearRange: number;
    private _chatFloodSensitivity: number;

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

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string)
    {
        this._password = password;
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

    public get tags(): string[]
    {
        return this._tags;
    }

    public set tags(tags: string[])
    {
        this._tags = tags;
    }

    public get whoCanMute(): number
    {
        return this._whoCanMute;
    }

    public set whoCanMute(mute: number)
    {
        this._whoCanMute = mute;
    }

    public get whoCanKick(): number
    {
        return this._whoCanKick;
    }

    public set whoCanKick(kick: number)
    {
        this._whoCanKick = kick;
    }

    public get whoCanBan(): number
    {
        return this._whoCanBan;
    }

    public set whoCanBan(ban: number)
    {
        this._whoCanBan = ban;
    }

    public get chatMode(): number
    {
        return this._chatMode;
    }

    public set chatMode(mode: number)
    {
        this._chatMode = mode;
    }

    public get chatBubbleSize(): number
    {
        return this._chatBubbleSize;
    }

    public set chatBubbleSize(size: number)
    {
        this._chatBubbleSize = size;
    }

    public get chatScrollUpFrequency(): number
    {
        return this._chatScrollUpFrequency;
    }

    public set chatScrollUpFrequency(frequency: number)
    {
        this._chatScrollUpFrequency = frequency;
    }

    public get chatFullHearRange(): number
    {
        return this._chatFullHearRange;
    }

    public set chatFullHearRange(range: number)
    {
        this._chatFullHearRange = range;
    }

    public get chatFloodSensitivity(): number
    {
        return this._chatFloodSensitivity;
    }

    public set chatFloodSensitivity(sensitivity: number)
    {
        this._chatFloodSensitivity = sensitivity;
    }

    public get allowNavigatorDynCats(): boolean
    {
        return this._allowNavigatorDynCats;
    }

    public set allowNavigatorDynCats(flag: boolean)
    {
        this._allowNavigatorDynCats = flag;
    }
}
