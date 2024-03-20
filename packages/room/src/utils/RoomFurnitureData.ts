import { IObjectData, IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';

export class RoomFurnitureData
{
    private _id: number;
    private _typeId: number;
    private _type: string;
    private _location: IVector3D;
    private _direction: IVector3D;
    private _state: number;
    private _data: IObjectData;
    private _extra: number;
    private _expiryTime: number;
    private _usagePolicy: number;
    private _ownerId: number;
    private _ownerName: string;
    private _synchronized: boolean;
    private _realRoomObject: boolean;
    private _sizeZ: number;

    constructor(id: number, typeId: number, type: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra: number = NaN, expires: number = -1, usagePolicy: number = 0, ownerId: number = 0, ownerName: string = '', synchronized: boolean = true, realRoomObject: boolean = true, sizeZ: number = -1)
    {
        this._id = id;
        this._typeId = typeId;
        this._type = type;
        this._state = state;
        this._data = objectData;
        this._extra = extra;
        this._expiryTime = expires;
        this._usagePolicy = usagePolicy;
        this._ownerId = ownerId;
        this._ownerName = ownerName;
        this._synchronized = synchronized;
        this._realRoomObject = realRoomObject;
        this._sizeZ = sizeZ;

        this._location = new Vector3d();
        this._direction = new Vector3d();

        this._location.assign(location);
        this._direction.assign(direction);
    }

    public get id(): number
    {
        return this._id;
    }

    public get typeId(): number
    {
        return this._typeId;
    }

    public get type(): string
    {
        return this._type;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }

    public get state(): number
    {
        return this._state;
    }

    public get data(): IObjectData
    {
        return this._data;
    }

    public get extra(): number
    {
        return this._extra;
    }

    public get expiryTime(): number
    {
        return this._expiryTime;
    }

    public get usagePolicy(): number
    {
        return this._usagePolicy;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get synchronized(): boolean
    {
        return this._synchronized;
    }

    public get realRoomObject(): boolean
    {
        return this._realRoomObject;
    }

    public get sizeZ(): number
    {
        return this._sizeZ;
    }
}
