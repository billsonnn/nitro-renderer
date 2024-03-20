import { IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { Point } from 'pixi.js';

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
        this._corners = [];
        this._endPoints = [];
        this._directions = [];
        this._lengths = [];
        this._leftTurns = [];
        this._borders = [];
        this._hideWalls = [];
        this._manuallyLeftCut = [];
        this._manuallyRightCut = [];
        this._addDuplicates = false;
        this._count = 0;
    }

    public addWall(k: Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): void
    {
        if(((this._addDuplicates) || (this.checkIsNotDuplicate(k, _arg_2, _arg_3, _arg_4, _arg_5))))
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

    private checkIsNotDuplicate(k: Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): boolean
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

    public getCorner(k: number): Point
    {
        return this._corners[k];
    }

    public getEndPoint(k: number): Point
    {
        this.calculateWallEndPoints();
        return this._endPoints[k];
    }

    public getLength(k: number): number
    {
        return this._lengths[k];
    }

    public getDirection(k: number): number
    {
        return this._directions[k];
    }

    public getBorder(k: number): boolean
    {
        return this._borders[k];
    }

    public getHideWall(k: number): boolean
    {
        return this._hideWalls[k];
    }

    public getLeftTurn(k: number): boolean
    {
        return this._leftTurns[k];
    }

    public getManuallyLeftCut(k: number): boolean
    {
        return this._manuallyLeftCut[k];
    }

    public getManuallyRightCut(k: number): boolean
    {
        return this._manuallyRightCut[k];
    }

    public setHideWall(k: number, _arg_2: boolean): void
    {
        this._hideWalls[k] = _arg_2;
    }

    public setLength(k: number, _arg_2: number): void
    {
        if(_arg_2 < this._lengths[k])
        {
            this._lengths[k] = _arg_2;
            this._manuallyRightCut[k] = true;
        }
    }

    public moveCorner(k: number, _arg_2: number): void
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

    private calculateWallEndPoints(): void
    {
        let k: number;
        let _local_2: Point;
        let _local_3: Point;
        let _local_4: IVector3D;
        let _local_5: number;
        if(this._endPoints.length != this.count)
        {
            this._endPoints = [];
            k = 0;
            while(k < this.count)
            {
                _local_2 = this.getCorner(k);
                _local_3 = new Point(_local_2.x, _local_2.y);
                _local_4 = RoomWallData.WALL_DIRECTION_VECTORS[this.getDirection(k)];
                _local_5 = this.getLength(k);
                _local_3.x = (_local_3.x + (_local_4.x * _local_5));
                _local_3.y = (_local_3.y + (_local_4.y * _local_5));
                this._endPoints.push(_local_3);
                k++;
            }
        }
    }
}
