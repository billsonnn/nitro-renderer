import { Point } from '@pixi/math';
import { IRoomGeometry, IVector3D, Vector3d } from '../../api';

export class RoomGeometry implements IRoomGeometry
{
    public static SCALE_ZOOMED_IN: number = 64;
    public static SCALE_ZOOMED_OUT: number = 32;

    private _updateId: number = 0;
    private _x: IVector3D;
    private _y: IVector3D;
    private _z: IVector3D;
    private _directionAxis: IVector3D;
    private _location: IVector3D;
    private _direction: IVector3D;
    private _depth: IVector3D;
    private _scale: number = 1;
    private _x_scale: number = 1;
    private _y_scale: number = 1;
    private _z_scale: number = 1;
    private _x_scale_internal: number = 1;
    private _y_scale_internal: number = 1;
    private _z_scale_internal: number = 1;
    private _loc: IVector3D;
    private _dir: IVector3D;
    private _clipNear: number = -500;
    private _clipFar: number = 500;
    private _displacements: Map<string, IVector3D> = null;

    constructor(scale: number, direction: IVector3D, location: IVector3D, _arg_4: IVector3D = null)
    {
        this.scale = scale;
        this._x = new Vector3d();
        this._y = new Vector3d();
        this._z = new Vector3d();
        this._directionAxis = new Vector3d();
        this._location = new Vector3d();
        this._direction = new Vector3d();
        this._depth = new Vector3d();
        this._x_scale_internal = 1;
        this._y_scale_internal = 1;
        this.x_scale = 1;
        this.y_scale = 1;
        this._z_scale_internal = (Math.sqrt((1 / 2)) / Math.sqrt((3 / 4)));
        this.z_scale = 1;
        this.location = new Vector3d(location.x, location.y, location.z);
        this.direction = new Vector3d(direction.x, direction.y, direction.z);
        if(_arg_4 != null)
        {
            this.setDepthVector(_arg_4);
        }
        else
        {
            this.setDepthVector(direction);
        }
        this._displacements = new Map();
    }

    public static getIntersectionVector(k: IVector3D, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): IVector3D
    {
        const _local_5: number = Vector3d.dotProduct(_arg_2, _arg_4);
        if(Math.abs(_local_5) < 1E-5)
        {
            return null;
        }
        const _local_6: IVector3D = Vector3d.dif(k, _arg_3);
        const _local_7: number = (-(Vector3d.dotProduct(_arg_4, _local_6)) / _local_5);
        const _local_8: IVector3D = Vector3d.sum(k, Vector3d.product(_arg_2, _local_7));
        return _local_8;
    }


    public get updateId(): number
    {
        return this._updateId;
    }

    public get scale(): number
    {
        return this._scale / Math.sqrt(0.5);
    }

    public set scale(scale: number)
    {
        if(scale <= 1)
        {
            scale = 1;
        }
        scale = (scale * Math.sqrt(0.5));
        if(scale != this._scale)
        {
            this._scale = scale;
            this._updateId++;
        }
    }

    public get directionAxis(): IVector3D
    {
        return this._directionAxis;
    }

    public get location(): IVector3D
    {
        this._location.assign(this._loc);
        this._location.x = (this._location.x * this._x_scale);
        this._location.y = (this._location.y * this._y_scale);
        this._location.z = (this._location.z * this._z_scale);
        return this._location;
    }

    public set location(location: IVector3D)
    {
        if(location == null)
        {
            return;
        }
        if(this._loc == null)
        {
            this._loc = new Vector3d();
        }
        const _local_2: number = this._loc.x;
        const _local_3: number = this._loc.y;
        const _local_4: number = this._loc.z;
        this._loc.assign(location);
        this._loc.x = (this._loc.x / this._x_scale);
        this._loc.y = (this._loc.y / this._y_scale);
        this._loc.z = (this._loc.z / this._z_scale);
        if((((!(this._loc.x == _local_2)) || (!(this._loc.y == _local_3))) || (!(this._loc.z == _local_4))))
        {
            this._updateId++;
        }
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }

    public set direction(direction: IVector3D)
    {
        let _local_21: number;
        let _local_22: number;
        let _local_23: IVector3D;
        let _local_24: IVector3D;
        let _local_25: IVector3D;
        if(direction == null)
        {
            return;
        }
        if(this._dir == null)
        {
            this._dir = new Vector3d();
        }
        const _local_2: number = this._dir.x;
        const _local_3: number = this._dir.y;
        const _local_4: number = this._dir.z;
        this._dir.assign(direction);
        this._direction.assign(direction);
        if((((!(this._dir.x == _local_2)) || (!(this._dir.y == _local_3))) || (!(this._dir.z == _local_4))))
        {
            this._updateId++;
        }
        const _local_5: IVector3D = new Vector3d(0, 1, 0);
        const _local_6: IVector3D = new Vector3d(0, 0, 1);
        const _local_7: IVector3D = new Vector3d(1, 0, 0);
        const _local_8: number = ((direction.x / 180) * Math.PI);
        const _local_9: number = ((direction.y / 180) * Math.PI);
        const _local_10: number = ((direction.z / 180) * Math.PI);
        const _local_11: number = Math.cos(_local_8);
        const _local_12: number = Math.sin(_local_8);
        const _local_13: IVector3D = Vector3d.sum(Vector3d.product(_local_5, _local_11), Vector3d.product(_local_7, -(_local_12)));
        const _local_14: IVector3D = new Vector3d(_local_6.x, _local_6.y, _local_6.z);
        const _local_15: IVector3D = Vector3d.sum(Vector3d.product(_local_5, _local_12), Vector3d.product(_local_7, _local_11));
        const _local_16: number = Math.cos(_local_9);
        const _local_17: number = Math.sin(_local_9);
        const _local_18: IVector3D = new Vector3d(_local_13.x, _local_13.y, _local_13.z);
        const _local_19: IVector3D = Vector3d.sum(Vector3d.product(_local_14, _local_16), Vector3d.product(_local_15, _local_17));
        const _local_20: IVector3D = Vector3d.sum(Vector3d.product(_local_14, -(_local_17)), Vector3d.product(_local_15, _local_16));
        if(_local_10 != 0)
        {
            _local_21 = Math.cos(_local_10);
            _local_22 = Math.sin(_local_10);
            _local_23 = Vector3d.sum(Vector3d.product(_local_18, _local_21), Vector3d.product(_local_19, _local_22));
            _local_24 = Vector3d.sum(Vector3d.product(_local_18, -(_local_22)), Vector3d.product(_local_19, _local_21));
            _local_25 = new Vector3d(_local_20.x, _local_20.y, _local_20.z);
            this._x.assign(_local_23);
            this._y.assign(_local_24);
            this._z.assign(_local_25);
            this._directionAxis.assign(this._z);
        }
        else
        {
            this._x.assign(_local_18);
            this._y.assign(_local_19);
            this._z.assign(_local_20);
            this._directionAxis.assign(this._z);
        }
    }

    public set x_scale(xScale: number)
    {
        if(this._x_scale != (xScale * this._x_scale_internal))
        {
            this._x_scale = (xScale * this._x_scale_internal);
            this._updateId++;
        }
    }

    public set y_scale(yScale: number)
    {
        if(this._y_scale != (yScale * this._y_scale_internal))
        {
            this._y_scale = (yScale * this._y_scale_internal);
            this._updateId++;
        }
    }

    public set z_scale(zScale: number)
    {
        if(this._z_scale != (zScale * this._z_scale_internal))
        {
            this._z_scale = (zScale * this._z_scale_internal);
            this._updateId++;
        }
    }

    public dispose(): void
    {
        this._x = null;
        this._y = null;
        this._z = null;
        this._loc = null;
        this._dir = null;
        this._directionAxis = null;
        this._location = null;
        if(this._displacements != null)
        {
            this._displacements.clear();
            this._displacements = null;
        }
    }

    public setDisplacement(k: IVector3D, _arg_2: IVector3D): void
    {
        let _local_3: string;
        let _local_4: IVector3D;
        if(((k == null) || (_arg_2 == null)))
        {
            return;
        }
        if(this._displacements != null)
        {
            _local_3 = Math.trunc(Math.round(k.x)) + '_' + Math.trunc(Math.round(k.y)) + '_' + Math.trunc(Math.round(k.z));
            this._displacements.delete(_local_3);
            _local_4 = new Vector3d();
            _local_4.assign(_arg_2);
            this._displacements.set(_local_3, _local_4);
            this._updateId++;
        }
    }

    private getDisplacenent(k: IVector3D): IVector3D
    {
        let _local_2: string;
        if(this._displacements != null)
        {
            _local_2 = Math.trunc(Math.round(k.x)) + '_' + Math.trunc(Math.round(k.y)) + '_' + Math.trunc(Math.round(k.z));
            return this._displacements.get(_local_2);
        }
        return null;
    }

    public setDepthVector(k: IVector3D): void
    {
        let _local_18: number;
        let _local_19: number;
        let _local_20: IVector3D;
        let _local_21: IVector3D;
        let _local_22: IVector3D;
        const _local_2: IVector3D = new Vector3d(0, 1, 0);
        const _local_3: IVector3D = new Vector3d(0, 0, 1);
        const _local_4: IVector3D = new Vector3d(1, 0, 0);
        const _local_5: number = ((k.x / 180) * Math.PI);
        const _local_6: number = ((k.y / 180) * Math.PI);
        const _local_7: number = ((k.z / 180) * Math.PI);
        const _local_8: number = Math.cos(_local_5);
        const _local_9: number = Math.sin(_local_5);
        const _local_10: IVector3D = Vector3d.sum(Vector3d.product(_local_2, _local_8), Vector3d.product(_local_4, -(_local_9)));
        const _local_11: IVector3D = new Vector3d(_local_3.x, _local_3.y, _local_3.z);
        const _local_12: IVector3D = Vector3d.sum(Vector3d.product(_local_2, _local_9), Vector3d.product(_local_4, _local_8));
        const _local_13: number = Math.cos(_local_6);
        const _local_14: number = Math.sin(_local_6);
        const _local_15: IVector3D = new Vector3d(_local_10.x, _local_10.y, _local_10.z);
        const _local_16: IVector3D = Vector3d.sum(Vector3d.product(_local_11, _local_13), Vector3d.product(_local_12, _local_14));
        const _local_17: IVector3D = Vector3d.sum(Vector3d.product(_local_11, -(_local_14)), Vector3d.product(_local_12, _local_13));
        if(_local_7 != 0)
        {
            _local_18 = Math.cos(_local_7);
            _local_19 = Math.sin(_local_7);
            _local_20 = Vector3d.sum(Vector3d.product(_local_15, _local_18), Vector3d.product(_local_16, _local_19));
            _local_21 = Vector3d.sum(Vector3d.product(_local_15, -(_local_19)), Vector3d.product(_local_16, _local_18));
            _local_22 = new Vector3d(_local_17.x, _local_17.y, _local_17.z);
            this._depth.assign(_local_22);
        }
        else
        {
            this._depth.assign(_local_17);
        }
        this._updateId++;
    }

    public adjustLocation(k: IVector3D, _arg_2: number): void
    {
        if(((k == null) || (this._z == null)))
        {
            return;
        }
        const _local_3: IVector3D = Vector3d.product(this._z, -(_arg_2));
        const _local_4: IVector3D = new Vector3d((k.x + _local_3.x), (k.y + _local_3.y), (k.z + _local_3.z));
        this.location = _local_4;
    }

    public getCoordinatePosition(k: IVector3D): IVector3D
    {
        if(k == null)
        {
            return null;
        }
        const _local_2: number = Vector3d.scalarProjection(k, this._x);
        const _local_3: number = Vector3d.scalarProjection(k, this._y);
        const _local_4: number = Vector3d.scalarProjection(k, this._z);
        const _local_5: IVector3D = new Vector3d(_local_2, _local_3, _local_4);
        return _local_5;
    }

    public getScreenPosition(k: IVector3D): IVector3D
    {
        let _local_2: IVector3D = Vector3d.dif(k, this._loc);
        _local_2.x = (_local_2.x * this._x_scale);
        _local_2.y = (_local_2.y * this._y_scale);
        _local_2.z = (_local_2.z * this._z_scale);
        let _local_3: number = Vector3d.scalarProjection(_local_2, this._depth);
        if(((_local_3 < this._clipNear) || (_local_3 > this._clipFar)))
        {
            return null;
        }
        let _local_4: number = Vector3d.scalarProjection(_local_2, this._x);
        let _local_5: number = -(Vector3d.scalarProjection(_local_2, this._y));
        _local_4 = (_local_4 * this._scale);
        _local_5 = (_local_5 * this._scale);
        const _local_6: IVector3D = this.getDisplacenent(k);
        if(_local_6 != null)
        {
            _local_2 = Vector3d.dif(k, this._loc);
            _local_2.add(_local_6);
            _local_2.x = (_local_2.x * this._x_scale);
            _local_2.y = (_local_2.y * this._y_scale);
            _local_2.z = (_local_2.z * this._z_scale);
            _local_3 = Vector3d.scalarProjection(_local_2, this._depth);
        }
        _local_2.x = _local_4;
        _local_2.y = _local_5;
        _local_2.z = _local_3;
        return _local_2;
    }

    public getScreenPoint(k: IVector3D): Point
    {
        const _local_2: IVector3D = this.getScreenPosition(k);
        if(_local_2 == null)
        {
            return null;
        }
        const _local_3: Point = new Point(_local_2.x, _local_2.y);
        return _local_3;
    }

    public getPlanePosition(k: Point, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): Point
    {
        let _local_15: number;
        let _local_16: number;
        const _local_5: number = (k.x / this._scale);
        const _local_6: number = (-(k.y) / this._scale);
        const _local_7: IVector3D = Vector3d.product(this._x, _local_5);
        _local_7.add(Vector3d.product(this._y, _local_6));
        const _local_8: IVector3D = new Vector3d((this._loc.x * this._x_scale), (this._loc.y * this._y_scale), (this._loc.z * this._z_scale));
        _local_8.add(_local_7);
        const _local_9: IVector3D = this._z;
        const _local_10: IVector3D = new Vector3d((_arg_2.x * this._x_scale), (_arg_2.y * this._y_scale), (_arg_2.z * this._z_scale));
        const _local_11: IVector3D = new Vector3d((_arg_3.x * this._x_scale), (_arg_3.y * this._y_scale), (_arg_3.z * this._z_scale));
        const _local_12: IVector3D = new Vector3d((_arg_4.x * this._x_scale), (_arg_4.y * this._y_scale), (_arg_4.z * this._z_scale));
        const _local_13: IVector3D = Vector3d.crossProduct(_local_11, _local_12);
        const _local_14: IVector3D = new Vector3d();
        _local_14.assign(RoomGeometry.getIntersectionVector(_local_8, _local_9, _local_10, _local_13));
        if(_local_14 != null)
        {
            _local_14.subtract(_local_10);
            _local_15 = ((Vector3d.scalarProjection(_local_14, _arg_3) / _local_11.length) * _arg_3.length);
            _local_16 = ((Vector3d.scalarProjection(_local_14, _arg_4) / _local_12.length) * _arg_4.length);
            return new Point(_local_15, _local_16);
        }
        return null;
    }

    public performZoom(): void
    {
        if(this.isZoomedIn())
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
        }
        else
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_IN;
        }
    }

    public isZoomedIn(): boolean
    {
        return this.scale == RoomGeometry.SCALE_ZOOMED_IN;
    }

    public performZoomOut(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
    }

    public performZoomIn(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_IN;
    }
}
