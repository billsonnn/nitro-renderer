import { IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';

export class RoomCamera
{
    private static MOVE_SPEED_DENOMINATOR: number = 12;

    private _targetId: number = -1;
    private _targetCategory: number = -2;
    private _targetLoc: IVector3D = null;
    private _moveDistance: number = 0;
    private _previousMoveSpeed: number = 0;
    private _maintainPreviousMoveSpeed: boolean = false;
    private _currentLoc: IVector3D = null;
    private _targetObjectLoc: IVector3D;
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

    public get location(): IVector3D
    {
        return this._currentLoc;
    }

    public get targetId(): number
    {
        return this._targetId;
    }

    public set targetId(k: number)
    {
        this._targetId = k;
    }

    public get targetCategory(): number
    {
        return this._targetCategory;
    }

    public set targetCategory(k: number)
    {
        this._targetCategory = k;
    }

    public get targetObjectLoc(): IVector3D
    {
        return this._targetObjectLoc;
    }

    public set targetObjectLoc(k: IVector3D)
    {
        this._targetObjectLoc.assign(k);
    }

    public get limitedLocationX(): boolean
    {
        return this._limitedLocX;
    }

    public set limitedLocationX(k: boolean)
    {
        this._limitedLocX = k;
    }

    public get limitedLocationY(): boolean
    {
        return this._limitedLocY;
    }

    public set limitedLocationY(k: boolean)
    {
        this._limitedLocY = k;
    }

    public get centeredLocX(): boolean
    {
        return this._centeredLocX;
    }

    public set centeredLocX(k: boolean)
    {
        this._centeredLocX = k;
    }

    public get centeredLocY(): boolean
    {
        return this._centeredLocY;
    }

    public set centeredLocY(k: boolean)
    {
        this._centeredLocY = k;
    }

    public get screenWd(): number
    {
        return this._screenWd;
    }

    public set screenWd(k: number)
    {
        this._screenWd = k;
    }

    public get screenHt(): number
    {
        return this._screenHt;
    }

    public set screenHt(k: number)
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

    public get roomWd(): number
    {
        return this._roomWd;
    }

    public set roomWd(k: number)
    {
        this._roomWd = k;
    }

    public get roomHt(): number
    {
        return this._roomHt;
    }

    public set roomHt(k: number)
    {
        this._roomHt = k;
    }

    public get geometryUpdateId(): number
    {
        return this._geometryUpdateId;
    }

    public set geometryUpdateId(k: number)
    {
        this._geometryUpdateId = k;
    }

    public get isMoving(): boolean
    {
        if(((!(this._targetLoc == null)) && (!(this._currentLoc == null))))
        {
            return true;
        }
        return false;
    }

    public set target(k: IVector3D)
    {
        let _local_2: IVector3D;
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

    public initializeLocation(k: IVector3D): void
    {
        if(this._currentLoc != null)
        {
            return;
        }
        this._currentLoc = new Vector3d();
        this._currentLoc.assign(k);
    }

    public resetLocation(k: IVector3D): void
    {
        if(this._currentLoc == null)
        {
            this._currentLoc = new Vector3d();
        }
        this._currentLoc.assign(k);
    }

    public update(k: number, _arg_2: number): void
    {
        let _local_3: IVector3D;
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

    public activateFollowing(k: number): void
    {
        this._followDuration = k;
    }
}
