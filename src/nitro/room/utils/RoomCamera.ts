import { IVector3D } from '../../../room/utils/IVector3D';
import { Vector3d } from '../../../room/utils/Vector3d';

export class RoomCamera
{
    private static MOVE_SPEED_DENOMINATOR: number = 12;

    private _targetId: number = -1;
    private _targetCategory: number = -2;
    private _targetLoc:Vector3d = null;
    private _moveDistance: number = 0;
    private _previousMoveSpeed: number = 0;
    private _maintainPreviousMoveSpeed: boolean = false;
    private _currentLoc:Vector3d = null;
    private _targetObjectLoc:Vector3d;
    private _limitedLocX: boolean = false;
    private _limitedLocY: boolean = false;
    private _centeredLocX: boolean = false;
    private _centeredLocY: boolean = false;
    private _screenWd: number = 0;
    private _screenHt: number = 0;
    private _scale: number = 0;
    private _roomWd: number = 0;
    private _roomHt: number = 0;
    private _geometryUpdateId: number = -1;
    private _scaleChanged: boolean = false;
    private _followDuration: number;

    constructor()
    {
        this._targetObjectLoc = new Vector3d();
    }

    public get location():IVector3D
    {
        return this._currentLoc;
    }

    public get _Str_10760(): number
    {
        return this._targetId;
    }

    public set _Str_10760(k: number)
    {
        this._targetId = k;
    }

    public get _Str_16562(): number
    {
        return this._targetCategory;
    }

    public set _Str_16562(k: number)
    {
        this._targetCategory = k;
    }

    public get _Str_16185():IVector3D
    {
        return this._targetObjectLoc;
    }

    public set _Str_16185(k:IVector3D)
    {
        this._targetObjectLoc.assign(k);
    }

    public get _Str_10235(): boolean
    {
        return this._limitedLocX;
    }

    public set _Str_10235(k: boolean)
    {
        this._limitedLocX = k;
    }

    public get _Str_10446(): boolean
    {
        return this._limitedLocY;
    }

    public set _Str_10446(k: boolean)
    {
        this._limitedLocY = k;
    }

    public get _Str_8564(): boolean
    {
        return this._centeredLocX;
    }

    public set _Str_8564(k: boolean)
    {
        this._centeredLocX = k;
    }

    public get _Str_8690(): boolean
    {
        return this._centeredLocY;
    }

    public set _Str_8690(k: boolean)
    {
        this._centeredLocY = k;
    }

    public get _Str_7609(): number
    {
        return this._screenWd;
    }

    public set _Str_7609(k: number)
    {
        this._screenWd = k;
    }

    public get _Str_7902(): number
    {
        return this._screenHt;
    }

    public set _Str_7902(k: number)
    {
        this._screenHt = k;
    }

    public get scale(): number
    {
        return this._scale;
    }

    public set scale(k: number)
    {
        if(this._scale != k)
        {
            this._scale = k;
            this._scaleChanged = true;
        }
    }

    public get _Str_18975(): number
    {
        return this._roomWd;
    }

    public set _Str_18975(k: number)
    {
        this._roomWd = k;
    }

    public get _Str_15953(): number
    {
        return this._roomHt;
    }

    public set _Str_15953(k: number)
    {
        this._roomHt = k;
    }

    public get _Str_16377(): number
    {
        return this._geometryUpdateId;
    }

    public set _Str_16377(k: number)
    {
        this._geometryUpdateId = k;
    }

    public get _Str_12536(): boolean
    {
        if(((!(this._targetLoc == null)) && (!(this._currentLoc == null))))
        {
            return true;
        }
        return false;
    }

    public set target(k:IVector3D)
    {
        let _local_2:Vector3d;
        if(this._targetLoc == null)
        {
            this._targetLoc = new Vector3d();
        }
        if((((!(this._targetLoc.x == k.x)) || (!(this._targetLoc.y == k.y))) || (!(this._targetLoc.z == k.z))))
        {
            this._targetLoc.assign(k);
            _local_2 = Vector3d.dif(this._targetLoc, this._currentLoc);
            this._moveDistance = _local_2.length;
            this._maintainPreviousMoveSpeed = true;
        }
    }

    public dispose(): void
    {
        this._targetLoc = null;
        this._currentLoc = null;
    }

    public _Str_20685(k:IVector3D): void
    {
        if(this._currentLoc != null)
        {
            return;
        }
        this._currentLoc = new Vector3d();
        this._currentLoc.assign(k);
    }

    public _Str_25467(k:IVector3D): void
    {
        if(this._currentLoc == null)
        {
            this._currentLoc = new Vector3d();
        }
        this._currentLoc.assign(k);
    }

    public update(k: number, _arg_2: number): void
    {
        let _local_3:Vector3d;
        let _local_4: number;
        let _local_5: number;
        let _local_6: number;
        let _local_7: number;
        if((((this._followDuration > 0) && (!(this._targetLoc == null))) && (!(this._currentLoc == null))))
        {
            if(this._scaleChanged)
            {
                this._scaleChanged = false;
                this._currentLoc = this._targetLoc;
                this._targetLoc = null;
                return;
            }
            _local_3 = Vector3d.dif(this._targetLoc, this._currentLoc);
            if(_local_3.length > this._moveDistance)
            {
                this._moveDistance = _local_3.length;
            }
            if(_local_3.length <= _arg_2)
            {
                this._currentLoc = this._targetLoc;
                this._targetLoc = null;
                this._previousMoveSpeed = 0;
            }
            else
            {
                _local_4 = Math.sin(((Math.PI * _local_3.length) / this._moveDistance));
                _local_5 = (_arg_2 * 0.5);
                _local_6 = (this._moveDistance / RoomCamera.MOVE_SPEED_DENOMINATOR);
                _local_7 = (_local_5 + ((_local_6 - _local_5) * _local_4));
                if(this._maintainPreviousMoveSpeed)
                {
                    if(_local_7 < this._previousMoveSpeed)
                    {
                        _local_7 = this._previousMoveSpeed;
                        if(_local_7 > _local_3.length)
                        {
                            _local_7 = _local_3.length;
                        }
                    }
                    else
                    {
                        this._maintainPreviousMoveSpeed = false;
                    }
                }
                this._previousMoveSpeed = _local_7;
                _local_3.divide(_local_3.length);
                _local_3.multiply(_local_7);
                this._currentLoc = Vector3d.sum(this._currentLoc, _local_3);
            }
        }
    }

    public reset(): void
    {
        this._geometryUpdateId = -1;
    }

    public _Str_19465(k: number): void
    {
        this._followDuration = k;
    }
}
