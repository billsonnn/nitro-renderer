export class UserMessageData
{
    public static M: string = 'M';
    public static F: string = 'F';

    private _roomIndex: number = 0;
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _dir: number = 0;
    private _name: string = '';
    private _userType: number = 0;
    private _sex: string = '';
    private _figure: string = '';
    private _custom: string = '';
    private _activityPoints: number = 0;
    private _webID: number = 0;
    private _groupID: number = 0;
    private _groupStatus: number = 0;
    private _groupName: string = '';
    private _subType: string = '';
    private _ownerId: number = 0;
    private _ownerName: string = '';
    private _rarityLevel: number = 0;
    private _hasSaddle: boolean = false;
    private _isRiding: boolean = false;
    private _canBreed: boolean = false;
    private _canHarvest: boolean = false;
    private _canRevive: boolean = false;
    private _hasBreedingPermission: boolean = false;
    private _petLevel: number = 0;
    private _petPosture: string = '';
    private _botSkills: number[] = [];
    private _isModerator: boolean = false;
    private _isReadOnly: boolean = false;

    constructor(k: number)
    {
        this._roomIndex = k;
    }

    public setReadOnly(): void
    {
        this._isReadOnly = true;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(k: number)
    {
        if(!this._isReadOnly)
        {
            this._x = k;
        }
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(k: number)
    {
        if(!this._isReadOnly)
        {
            this._y = k;
        }
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(k: number)
    {
        if(!this._isReadOnly)
        {
            this._z = k;
        }
    }

    public get dir(): number
    {
        return this._dir;
    }

    public set dir(k: number)
    {
        if(!this._isReadOnly)
        {
            this._dir = k;
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(k: string)
    {
        if(!this._isReadOnly)
        {
            this._name = k;
        }
    }

    public get userType(): number
    {
        return this._userType;
    }

    public set userType(k: number)
    {
        if(!this._isReadOnly)
        {
            this._userType = k;
        }
    }

    public get sex(): string
    {
        return this._sex;
    }

    public set sex(k: string)
    {
        if(!this._isReadOnly)
        {
            this._sex = k;
        }
    }

    public get figure(): string
    {
        return this._figure;
    }

    public set figure(k: string)
    {
        if(!this._isReadOnly)
        {
            this._figure = k;
        }
    }

    public get custom(): string
    {
        return this._custom;
    }

    public set custom(k: string)
    {
        if(!this._isReadOnly)
        {
            this._custom = k;
        }
    }

    public get activityPoints(): number
    {
        return this._activityPoints;
    }

    public set activityPoints(k: number)
    {
        if(!this._isReadOnly)
        {
            this._activityPoints = k;
        }
    }

    public get webID(): number
    {
        return this._webID;
    }

    public set webID(k: number)
    {
        if(!this._isReadOnly)
        {
            this._webID = k;
        }
    }

    public get groupID(): number
    {
        return this._groupID;
    }

    public set groupID(groupId: number)
    {
        if(!this._isReadOnly)
        {
            this._groupID = groupId;
        }
    }

    public get groupName(): string
    {
        return this._groupName;
    }

    public set groupName(k: string)
    {
        if(!this._isReadOnly)
        {
            this._groupName = k;
        }
    }

    public get groupStatus(): number
    {
        return this._groupStatus;
    }

    public set groupStatus(k: number)
    {
        if(!this._isReadOnly)
        {
            this._groupStatus = k;
        }
    }

    public get subType(): string
    {
        return this._subType;
    }

    public set subType(k: string)
    {
        if(!this._isReadOnly)
        {
            this._subType = k;
        }
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public set ownerId(k: number)
    {
        if(!this._isReadOnly)
        {
            this._ownerId = k;
        }
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public set ownerName(k: string)
    {
        if(!this._isReadOnly)
        {
            this._ownerName = k;
        }
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public set rarityLevel(k: number)
    {
        if(!this._isReadOnly)
        {
            this._rarityLevel = k;
        }
    }

    public get hasSaddle(): boolean
    {
        return this._hasSaddle;
    }

    public set hasSaddle(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._hasSaddle = k;
        }
    }

    public get isRiding(): boolean
    {
        return this._isRiding;
    }

    public set isRiding(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._isRiding = k;
        }
    }

    public get canBreed(): boolean
    {
        return this._canBreed;
    }

    public set canBreed(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._canBreed = k;
        }
    }

    public get canHarvest(): boolean
    {
        return this._canHarvest;
    }

    public set canHarvest(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._canHarvest = k;
        }
    }

    public get canRevive(): boolean
    {
        return this._canRevive;
    }

    public set canRevive(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._canRevive = k;
        }
    }

    public get hasBreedingPermission(): boolean
    {
        return this._hasBreedingPermission;
    }

    public set hasBreedingPermission(k: boolean)
    {
        if(!this._isReadOnly)
        {
            this._hasBreedingPermission = k;
        }
    }

    public get petLevel(): number
    {
        return this._petLevel;
    }

    public set petLevel(k: number)
    {
        if(!this._isReadOnly)
        {
            this._petLevel = k;
        }
    }

    public get petPosture(): string
    {
        return this._petPosture;
    }

    public set petPosture(k: string)
    {
        if(!this._isReadOnly)
        {
            this._petPosture = k;
        }
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
        if(!this._isReadOnly)
        {
            this._isModerator = k;
        }
    }
}
