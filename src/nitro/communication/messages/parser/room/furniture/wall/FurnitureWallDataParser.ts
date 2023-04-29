import { IMessageDataWrapper } from '../../../../../../../api';

export class FurnitureWallDataParser
{
    private _itemId: number;
    private _spriteId: number;
    private _location: string;
    private _stuffData: string;
    private _state: number;
    private _secondsToExpiration: number;
    private _usagePolicy: number;
    private _userId: number;
    private _username: string;

    private _width: number;
    private _height: number;
    private _localX: number;
    private _localY: number;
    private _y: number;
    private _z: number;
    private _direction: string;
    private _isOldFormat: boolean;

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
        this._location = null;
        this._stuffData = null;
        this._state = 0;
        this._secondsToExpiration = 0;
        this._usagePolicy = -1;
        this._userId = 0;
        this._username = null;

        this._width = 0;
        this._height = 0;
        this._localX = 0;
        this._localY = 0;
        this._y = 0;
        this._z = 0;
        this._direction = null;
        this._isOldFormat = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = parseInt(wrapper.readString());
        this._spriteId = wrapper.readInt();
        this._location = wrapper.readString();
        this._stuffData = wrapper.readString();
        this._secondsToExpiration = wrapper.readInt();
        this._usagePolicy = wrapper.readInt();
        this._userId = wrapper.readInt();
        this._username = null;

        const state = parseFloat(this._stuffData);

        if(!isNaN(state)) this._state = Math.trunc(state);

        if(this._location.indexOf(':') === 0)
        {
            this._isOldFormat = false;

            let parts = this._location.split(' ');

            if(parts.length >= 3)
            {
                let widthHeight = parts[0];
                let leftRight = parts[1];

                const direction = parts[2];

                if((widthHeight.length > 3) && (leftRight.length > 2))
                {
                    widthHeight = widthHeight.substr(3);
                    leftRight = leftRight.substr(2);
                    parts = widthHeight.split(',');

                    if(parts.length >= 2)
                    {
                        const width = parseInt(parts[0]);
                        const height = parseInt(parts[1]);

                        parts = leftRight.split(',');

                        if(parts.length >= 2)
                        {
                            const localX = parseInt(parts[0]);
                            const localY = parseInt(parts[1]);

                            this._width = width;
                            this._height = height;
                            this._localX = localX;
                            this._localY = localY;
                            this._direction = direction;
                        }
                    }
                }
            }
        }
        else
        {
            this._isOldFormat = true;

            // _local_12 = _local_4.split(" ");
            // if (_local_12.length >= 2)
            // {
            //     _local_13 = String(_local_12[0]);
            //     if (((_local_13 == "rightwall") || (_local_13 == "frontwall")))
            //     {
            //         _local_13 = "r";
            //     }
            //     else
            //     {
            //         _local_13 = "l";
            //     }
            //     _local_20 = String(_local_12[1]);
            //     _local_21 = _local_20.split(",");
            //     if (_local_21.length >= 3)
            //     {
            //         _local_22 = 0;
            //         _local_23 = parseFloat(_local_21[0]);
            //         _local_24 = parseFloat(_local_21[1]);
            //         _local_11.y = _local_23;
            //         _local_11.z = _local_24;
            //         _local_11.dir = _local_13;
            //         _local_11.data = _local_5;
            //         _local_11.state = _local_9;
            //     }
            //  }
        }

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

    public get wallPosition(): string
    {
        return this._location;
    }

    public get stuffData(): string
    {
        return this._stuffData;
    }

    public get state(): number
    {
        return this._state;
    }

    public get secondsToExpiration(): number
    {
        return this._secondsToExpiration;
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

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get localX(): number
    {
        return this._localX;
    }

    public get localY(): number
    {
        return this._localY;
    }

    public get direction(): string
    {
        return this._direction;
    }

    public get isOldFormat(): boolean
    {
        return this._isOldFormat;
    }
}
