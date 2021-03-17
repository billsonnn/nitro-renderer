import { Point } from 'pixi.js';
import { IVector3D } from '../../../room/utils/IVector3D';
import { Vector3d } from '../../../room/utils/Vector3d';

export class RoomWallData
{
    public static WALL_DIRECTION_VECTORS: Vector3d[] = [
        new Vector3d(1, 0, 0),
        new Vector3d(0, 1, 0),
        new Vector3d(-1, 0, 0),
        new Vector3d(0, -1, 0)
    ];

    public static WALL_NORMAL_VECTORS: Vector3d[] = [
        new Vector3d(0, 1, 0),
        new Vector3d(-1, 0, 0),
        new Vector3d(0, -1, 0),
        new Vector3d(1, 0, 0)
    ];

    private _corners: Point[];
    private _endPoints: Point[];
    private _directions: number[];
    private _lengths: number[];
    private _leftTurns: boolean[];
    private _borders: boolean[];
    private _hideWalls: boolean[];
    private _manuallyLeftCut: boolean[];
    private _manuallyRightCut: boolean[];
    private _addDuplicates: boolean;
    private _count: number;

    constructor()
    {
        this._corners           = [];
        this._endPoints         = [];
        this._directions        = [];
        this._lengths           = [];
        this._leftTurns         = [];
        this._borders           = [];
        this._hideWalls         = [];
        this._manuallyLeftCut   = [];
        this._manuallyRightCut  = [];
        this._addDuplicates     = false;
        this._count             = 0;
    }

    public _Str_17862(k: Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): void
    {
        if(((this._addDuplicates) || (this._Str_22484(k, _arg_2, _arg_3, _arg_4, _arg_5))))
        {
            this._corners.push(k);
            this._directions.push(_arg_2);
            this._lengths.push(_arg_3);
            this._borders.push(_arg_4);
            this._leftTurns.push(_arg_5);
            this._hideWalls.push(false);
            this._manuallyLeftCut.push(false);
            this._manuallyRightCut.push(false);
            this._count++;
        }
    }

    private _Str_22484(k: Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): boolean
    {
        let _local_6 = 0;

        while(_local_6 < this._count)
        {
            if(((((((this._corners[_local_6].x == k.x) && (this._corners[_local_6].y == k.y)) && (this._directions[_local_6] == _arg_2)) && (this._lengths[_local_6] == _arg_3)) && (this._borders[_local_6] == _arg_4)) && (this._leftTurns[_local_6] == _arg_5)))
            {
                return false;
            }
            _local_6++;
        }
        return true;
    }

    public get count(): number
    {
        return this._count;
    }

    public _Str_10778(k: number): Point
    {
        return this._corners[k];
    }

    public _Str_19138(k: number): Point
    {
        this._Str_23674();
        return this._endPoints[k];
    }

    public _Str_13743(k: number): number
    {
        return this._lengths[k];
    }

    public getDirection(k: number): number
    {
        return this._directions[k];
    }

    public _Str_25208(k: number): boolean
    {
        return this._borders[k];
    }

    public _Str_10019(k: number): boolean
    {
        return this._hideWalls[k];
    }

    public _Str_17084(k: number): boolean
    {
        return this._leftTurns[k];
    }

    public _Str_25455(k: number): boolean
    {
        return this._manuallyLeftCut[k];
    }

    public _Str_24163(k: number): boolean
    {
        return this._manuallyRightCut[k];
    }

    public _Str_15901(k: number, _arg_2: boolean): void
    {
        this._hideWalls[k] = _arg_2;
    }

    public _Str_24531(k: number, _arg_2: number): void
    {
        if(_arg_2 < this._lengths[k])
        {
            this._lengths[k] = _arg_2;
            this._manuallyRightCut[k] = true;
        }
    }

    public _Str_23976(k: number, _arg_2: number): void
    {
        let _local_3: IVector3D;
        if(((_arg_2 > 0) && (_arg_2 < this._lengths[k])))
        {
            const corner = this._corners[k];

            _local_3 = RoomWallData.WALL_DIRECTION_VECTORS[this.getDirection(k)];
            this._corners[k] = new Point((corner.x + (_arg_2 * _local_3.x)), (corner.y + (_arg_2 * _local_3.y)));
            this._lengths[k] = (this._lengths[k] - _arg_2);
            this._manuallyLeftCut[k] = true;
        }
    }

    private _Str_23674(): void
    {
        let k: number;
        let _local_2: Point;
        let _local_3: Point;
        let _local_4:IVector3D;
        let _local_5: number;
        if(this._endPoints.length != this.count)
        {
            this._endPoints = [];
            k = 0;
            while(k < this.count)
            {
                _local_2 = this._Str_10778(k);
                _local_3 = new Point(_local_2.x, _local_2.y);
                _local_4 = RoomWallData.WALL_DIRECTION_VECTORS[this.getDirection(k)];
                _local_5 = this._Str_13743(k);
                _local_3.x = (_local_3.x + (_local_4.x * _local_5));
                _local_3.y = (_local_3.y + (_local_4.y * _local_5));
                this._endPoints.push(_local_3);
                k++;
            }
        }
    }
}