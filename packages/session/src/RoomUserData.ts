import { IRoomUserData } from '@nitrots/api';

export class RoomUserData implements IRoomUserData
{
    private _roomIndex: number = -1;
    private _name: string = '';
    private _type: number = 0;
    private _sex: string = '';
    private _figure: string = '';
    private _custom: string = '';
    private _activityPoints: number;
    private _webID: number = 0;
    private _groupID: number = 0;
    private _groupStatus: number = 0;
    private _groupName: string = '';
    private _ownerId: number = 0;
    private _ownerName: string = '';
    private _petLevel: number = 0;
    private _rarityLevel: number = 0;
    private _hasSaddle: boolean;
    private _isRiding: boolean;
    private _canBreed: boolean;
    private _canHarvest: boolean;
    private _canRevive: boolean;
    private _hasBreedingPermission: boolean;
    private _botSkills: number[];
    private _isModerator: boolean;

    constructor(k: number)
    {
        this._roomIndex = k;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get activityPoints(): number
    {
        return this._activityPoints;
    }

    public set activityPoints(k: number)
    {
        this._activityPoints = k;
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(k: string)
    {
        this._name = k;
    }

    public get type(): number
    {
        return this._type;
    }

    public set type(k: number)
    {
        this._type = k;
    }

    public get sex(): string
    {
        return this._sex;
    }

    public set sex(k: string)
    {
        this._sex = k;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public set figure(k: string)
    {
        this._figure = k;
    }

    public get custom(): string
    {
        return this._custom;
    }

    public set custom(k: string)
    {
        this._custom = k;
    }

    public get webID(): number
    {
        return this._webID;
    }

    public set webID(k: number)
    {
        this._webID = k;
    }

    public get groupId(): number
    {
        return this._groupID;
    }

    public set groupId(groupId: number)
    {
        this._groupID = groupId;
    }

    public get groupName(): string
    {
        return this._groupName;
    }

    public set groupName(k: string)
    {
        this._groupName = k;
    }

    public get groupStatus(): number
    {
        return this._groupStatus;
    }

    public set groupStatus(k: number)
    {
        this._groupStatus = k;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public set ownerId(k: number)
    {
        this._ownerId = k;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public set ownerName(k: string)
    {
        this._ownerName = k;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public set rarityLevel(k: number)
    {
        this._rarityLevel = k;
    }

    public get hasSaddle(): boolean
    {
        return this._hasSaddle;
    }

    public set hasSaddle(k: boolean)
    {
        this._hasSaddle = k;
    }

    public get isRiding(): boolean
    {
        return this._isRiding;
    }

    public set isRiding(k: boolean)
    {
        this._isRiding = k;
    }

    public get canBreed(): boolean
    {
        return this._canBreed;
    }

    public set canBreed(k: boolean)
    {
        this._canBreed = k;
    }

    public get canHarvest(): boolean
    {
        return this._canHarvest;
    }

    public set canHarvest(k: boolean)
    {
        this._canHarvest = k;
    }

    public get canRevive(): boolean
    {
        return this._canRevive;
    }

    public set canRevive(k: boolean)
    {
        this._canRevive = k;
    }

    public get hasBreedingPermission(): boolean
    {
        return this._hasBreedingPermission;
    }

    public set hasBreedingPermission(k: boolean)
    {
        this._hasBreedingPermission = k;
    }

    public get petLevel(): number
    {
        return this._petLevel;
    }

    public set petLevel(k: number)
    {
        this._petLevel = k;
    }

    public get botSkills(): number[]
    {
        return this._botSkills;
    }

    public set botSkills(k: number[])
    {
        this._botSkills = k;
    }

    public get isModerator(): boolean
    {
        return this._isModerator;
    }

    public set isModerator(k: boolean)
    {
        this._isModerator = k;
    }
}
