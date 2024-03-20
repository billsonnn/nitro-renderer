import { IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { RoomPlaneMaskData } from './RoomPlaneMaskData';

export class RoomPlaneData
{
    public static PLANE_UNDEFINED: number = 0;
    public static PLANE_FLOOR: number = 1;
    public static PLANE_WALL: number = 2;
    public static PLANE_LANDSCAPE: number = 3;
    public static PLANE_BILLBOARD: number = 4;

    private _type: number = 0;
    private _loc: Vector3d = null;
    private _leftSide: Vector3d = null;
    private _rightSide: Vector3d = null;
    private _normal: Vector3d = null;
    private _normalDirection: Vector3d = null;
    private _secondaryNormals: Vector3d[];
    private _masks: RoomPlaneMaskData[];

    constructor(k: number, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D, _arg_5: IVector3D[])
    {
        let _local_6: number;
        let _local_7: number;
        let _local_8: number;
        let _local_9: number;
        let _local_10: number;
        let _local_11: number;
        let _local_12: IVector3D;
        let _local_13: Vector3d;
        this._secondaryNormals = [];
        this._masks = [];
        this._loc = new Vector3d();
        this._loc.assign(_arg_2);
        this._leftSide = new Vector3d();
        this._leftSide.assign(_arg_3);
        this._rightSide = new Vector3d();
        this._rightSide.assign(_arg_4);
        this._type = k;
        if(((!(_arg_3 == null)) && (!(_arg_4 == null))))
        {
            this._normal = Vector3d.crossProduct(_arg_3, _arg_4);
            _local_6 = 0;
            _local_7 = 0;
            _local_8 = 0;
            _local_9 = 0;
            _local_10 = 0;
            if(((!(this.normal.x == 0)) || (!(this.normal.y == 0))))
            {
                _local_9 = this.normal.x;
                _local_10 = this.normal.y;
                _local_6 = (360 + ((Math.atan2(_local_10, _local_9) / Math.PI) * 180));
                if(_local_6 >= 360)
                {
                    _local_6 = (_local_6 - 360);
                }
                _local_9 = Math.sqrt(((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y)));
                _local_10 = this.normal.z;
                _local_7 = (360 + ((Math.atan2(_local_10, _local_9) / Math.PI) * 180));
                if(_local_7 >= 360)
                {
                    _local_7 = (_local_7 - 360);
                }
            }
            else
            {
                if(this.normal.z < 0)
                {
                    _local_7 = 90;
                }
                else
                {
                    _local_7 = 270;
                }
            }
            this._normalDirection = new Vector3d(_local_6, _local_7, _local_8);
        }
        if(((!(_arg_5 == null)) && (_arg_5.length > 0)))
        {
            _local_11 = 0;
            while(_local_11 < _arg_5.length)
            {
                _local_12 = _arg_5[_local_11];
                if(((!(_local_12 == null)) && (_local_12.length > 0)))
                {
                    _local_13 = new Vector3d();
                    _local_13.assign(_local_12);
                    _local_13.multiply((1 / _local_13.length));
                    this._secondaryNormals.push(_local_13);
                }
                _local_11++;
            }
        }
    }

    public get type(): number
    {
        return this._type;
    }

    public get loc(): IVector3D
    {
        return this._loc;
    }

    public get leftSide(): IVector3D
    {
        return this._leftSide;
    }

    public get rightSide(): IVector3D
    {
        return this._rightSide;
    }

    public get normal(): IVector3D
    {
        return this._normal;
    }

    public get normalDirection(): IVector3D
    {
        return this._normalDirection;
    }

    public get secondaryNormalCount(): number
    {
        return this._secondaryNormals.length;
    }

    public get maskCount(): number
    {
        return this._masks.length;
    }

    public getSecondaryNormal(k: number): IVector3D
    {
        if(((k < 0) || (k >= this.secondaryNormalCount)))
        {
            return null;
        }
        const _local_2: Vector3d = new Vector3d();
        _local_2.assign((this._secondaryNormals[k] as IVector3D));
        return _local_2;
    }

    public addMask(k: number, _arg_2: number, _arg_3: number, _arg_4: number): void
    {
        const _local_5: RoomPlaneMaskData = new RoomPlaneMaskData(k, _arg_2, _arg_3, _arg_4);
        this._masks.push(_local_5);
    }

    private getMask(k: number): RoomPlaneMaskData
    {
        if(((k < 0) || (k >= this.maskCount)))
        {
            return null;
        }
        return this._masks[k];
    }

    public getMaskLeftSideLoc(k: number): number
    {
        const _local_2: RoomPlaneMaskData = this.getMask(k);
        if(_local_2 != null)
        {
            return _local_2.leftSideLoc;
        }
        return -1;
    }

    public getMaskRightSideLoc(k: number): number
    {
        const _local_2: RoomPlaneMaskData = this.getMask(k);
        if(_local_2 != null)
        {
            return _local_2.rightSideLoc;
        }
        return -1;
    }

    public getMaskLeftSideLength(k: number): number
    {
        const _local_2: RoomPlaneMaskData = this.getMask(k);
        if(_local_2 != null)
        {
            return _local_2.leftSideLength;
        }
        return -1;
    }

    public getMaskRightSideLength(k: number): number
    {
        const _local_2: RoomPlaneMaskData = this.getMask(k);
        if(_local_2 != null)
        {
            return _local_2.rightSideLength;
        }
        return -1;
    }
}
