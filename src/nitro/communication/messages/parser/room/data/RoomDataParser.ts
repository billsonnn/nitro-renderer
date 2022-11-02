import { IMessageDataWrapper } from '../../../../../../api';

export class RoomDataParser
{
    public static THUMBNAIL_BITMASK = 1;
    public static GROUPDATA_BITMASK = 2;
    public static ROOMAD_BITMASK = 4;
    public static SHOWOWNER_BITMASK = 8;
    public static ALLOW_PETS_BITMASK = 16;
    public static DISPLAY_ROOMAD_BITMASK = 32;

    public static OPEN_STATE = 0;
    public static DOORBELL_STATE = 1;
    public static PASSWORD_STATE = 2;
    public static INVISIBLE_STATE = 3;
    public static NOOB_STATE = 4;

    private _roomId: number;
    private _roomName: string;
    private _showOwner: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _doorMode: number;
    private _userCount: number;
    private _maxUserCount: number;
    private _description: string;
    private _tradeMode: number;
    private _score: number;
    private _ranking: number;
    private _categoryId: number;
    private _totalStars: number;
    private _groupId: number;
    private _groupName: string;
    private _groupBadge: string;
    private _tags: string[];
    private _bitMask: number;
    private _thumbnail: any;
    private _allowPets: boolean;
    private _displayAd: boolean;
    private _adName: string;
    private _adDescription: string;
    private _adExpiresIn: number;
    private _allInRoomMuted: boolean;
    private _canMute: boolean;

    private _officialRoomPicRef: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._roomId = 0;
        this._roomName = null;
        this._ownerId = 0;
        this._ownerName = null;
        this._doorMode = 0;
        this._userCount = 0;
        this._maxUserCount = 0;
        this._description = null;
        this._tradeMode = 2;
        this._score = 0;
        this._ranking = 0;
        this._categoryId = 0;
        this._totalStars = 0;
        this._groupId = 0;
        this._groupName = null;
        this._groupBadge = null;
        this._tags = [];
        this._bitMask = 0;
        this._thumbnail = null;
        this._allowPets = false;
        this._showOwner = true;
        this._displayAd = false;
        this._adName = null;
        this._adDescription = null;
        this._adExpiresIn = 0;
        this._allInRoomMuted = false;
        this._canMute = false;
        this._officialRoomPicRef = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._roomName = wrapper.readString();
        this._ownerId = wrapper.readInt();
        this._ownerName = wrapper.readString();
        this._doorMode = wrapper.readInt();
        this._userCount = wrapper.readInt();
        this._maxUserCount = wrapper.readInt();
        this._description = wrapper.readString();
        this._tradeMode = wrapper.readInt();
        this._score = wrapper.readInt();
        this._ranking = wrapper.readInt();
        this._categoryId = wrapper.readInt();

        this.parseTags(wrapper);

        this.parseBitMask(wrapper);

        return true;
    }

    private parseTags(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._tags = [];

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }

        return true;
    }

    private parseBitMask(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._bitMask = wrapper.readInt();

        if(this._bitMask & RoomDataParser.THUMBNAIL_BITMASK) this._officialRoomPicRef = wrapper.readString();

        if(this._bitMask & RoomDataParser.GROUPDATA_BITMASK)
        {
            this._groupId = wrapper.readInt();
            this._groupName = wrapper.readString();
            this._groupBadge = wrapper.readString();
        }

        if(this._bitMask & RoomDataParser.ROOMAD_BITMASK)
        {
            this._adName = wrapper.readString();
            this._adDescription = wrapper.readString();
            this._adExpiresIn = wrapper.readInt();
        }

        this._showOwner = (this._bitMask & RoomDataParser.SHOWOWNER_BITMASK) > 0;
        this._allowPets = (this._bitMask & RoomDataParser.ALLOW_PETS_BITMASK) > 0;
        this._displayAd = (this._bitMask & RoomDataParser.DISPLAY_ROOMAD_BITMASK) > 0;
        this._thumbnail = null;

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public set roomName(name: string)
    {
        this._roomName = name;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get doorMode(): number
    {
        return this._doorMode;
    }

    public get userCount(): number
    {
        return this._userCount;
    }

    public get maxUserCount(): number
    {
        return this._maxUserCount;
    }

    public get description(): string
    {
        return this._description;
    }

    public get tradeMode(): number
    {
        return this._tradeMode;
    }

    public get score(): number
    {
        return this._score;
    }

    public get ranking(): number
    {
        return this._ranking;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public get officialRoomPicRef(): string
    {
        return this._officialRoomPicRef;
    }

    public get habboGroupId(): number
    {
        return this._groupId;
    }

    public get groupName(): string
    {
        return this._groupName;
    }

    public get groupBadgeCode(): string
    {
        return this._groupBadge;
    }

    public get roomAdName(): string
    {
        return this._adName;
    }

    public get roomAdDescription(): string
    {
        return this._adDescription;
    }

    public get roomAdExpiresInMin(): number
    {
        return this._adExpiresIn;
    }

    public get showOwner(): boolean
    {
        return this._showOwner;
    }

    public get allowPets(): boolean
    {
        return this._allowPets;
    }

    public get displayRoomEntryAd(): boolean
    {
        return this._displayAd;
    }

    public get canMute(): boolean
    {
        return this._canMute;
    }

    public set canMute(k: boolean)
    {
        this._canMute = k;
    }

    public get allInRoomMuted(): boolean
    {
        return this._allInRoomMuted;
    }

    public set allInRoomMuted(k: boolean)
    {
        this._allInRoomMuted = k;
    }
}
