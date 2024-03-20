import { IMessageDataWrapper, IObjectData } from '@nitrots/api';
import { FurnitureDataParser } from '../FurnitureDataParser';

export class FurnitureFloorDataParser
{
    private _itemId: number;
    private _spriteId: number;
    private _spriteName: string;
    private _x: number;
    private _y: number;
    private _direction: number;
    private _z: number;
    private _stackHeight: number;
    private _extra: number;
    private _data: IObjectData;
    private _state: number;
    private _expires: number;
    private _usagePolicy: number;
    private _userId: number;
    private _username: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._itemId = 0;
        this._spriteId = 0;
        this._spriteName = null;
        this._x = 0;
        this._y = 0;
        this._direction = 0;
        this._z = 0;
        this._stackHeight = 0;
        this._extra = 0;
        this._data = null;
        this._state = 0;
        this._expires = 0;
        this._usagePolicy = 0;
        this._userId = 0;
        this._username = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();
        this._spriteId = wrapper.readInt();
        this._x = wrapper.readInt();
        this._y = wrapper.readInt();
        this._direction = ((wrapper.readInt() % 8) * 45);
        this._z = parseFloat(wrapper.readString());
        this._stackHeight = parseFloat(wrapper.readString());
        this._extra = wrapper.readInt();
        this._data = FurnitureDataParser.parseObjectData(wrapper);
        this._state = parseFloat(this._data && this._data.getLegacyString()) || 0;
        this._expires = wrapper.readInt();
        this._usagePolicy = wrapper.readInt();
        this._userId = wrapper.readInt();
        this._username = null;

        if(this._spriteId < 0) this._spriteName = wrapper.readString();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get spriteId(): number
    {
        return this._spriteId;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get direction(): number
    {
        return this._direction;
    }

    public get z(): number
    {
        return ((isNaN(this._z)) ? 0 : this._z);
    }

    public get stackHeight(): number
    {
        return ((isNaN(this._stackHeight)) ? 0 : this._stackHeight);
    }

    public get extra(): number
    {
        return this._extra;
    }

    public get data(): IObjectData
    {
        return this._data;
    }

    public get state(): number
    {
        return this._state;
    }

    public get expires(): number
    {
        return this._expires;
    }

    public get usagePolicy(): number
    {
        return this._usagePolicy;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public set username(username: string)
    {
        this._username = username;
    }

    public get spriteName(): string
    {
        return this._spriteName;
    }

    public set spriteName(type: string)
    {
        this._spriteName = type;
    }
}
