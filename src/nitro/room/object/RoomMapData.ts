import { IRoomMapData } from '../../../api';

export class RoomMapData implements IRoomMapData
{
    private _width: number;
    private _height: number;
    private _wallHeight: number;
    private _fixedWallsHeight: number;
    private _tileMap: { height: number }[][];
    private _holeMap: { id: number, x: number, y: number, width: number, height: number }[];
    private _doors: { x: number, y: number, z: number, dir: number }[];
    private _dimensions: { minX: number, maxX: number, minY: number, maxY: number };
    private _restrictsDragging: boolean;
    private _restrictsScaling: boolean;
    private _restrictedScale: number;

    constructor()
    {
        this._width = 0;
        this._height = 0;
        this._wallHeight = 0;
        this._fixedWallsHeight = 0;
        this._tileMap = [];
        this._holeMap = [];
        this._doors = [];
        this._dimensions = {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0
        };
        this._restrictsDragging = false;
        this._restrictedScale = 1;
        this._restrictsScaling = false;
    }

    public get width(): number
    {
        return this._width;
    }

    public set width(width: number)
    {
        this._width = width;
    }

    public get height(): number
    {
        return this._height;
    }

    public set height(height: number)
    {
        this._height = height;
    }

    public get wallHeight(): number
    {
        return this._wallHeight;
    }

    public set wallHeight(wallHeight: number)
    {
        this._wallHeight = wallHeight;
    }

    public get fixedWallsHeight(): number
    {
        return this._fixedWallsHeight;
    }

    public set fixedWallsHeight(fixedWallsHeight: number)
    {
        this._fixedWallsHeight = fixedWallsHeight;
    }

    public get tileMap(): { height: number }[][]
    {
        return this._tileMap;
    }

    public get holeMap(): { id: number, x: number, y: number, width: number, height: number }[]
    {
        return this._holeMap;
    }

    public get doors(): { x: number, y: number, z: number, dir: number }[]
    {
        return this._doors;
    }

    public get dimensions(): { minX: number, maxX: number, minY: number, maxY: number }
    {
        return this._dimensions;
    }

    public get restrictsDragging(): boolean
    {
        return this._restrictsDragging;
    }

    public set restrictsDragging(flag: boolean)
    {
        this._restrictsDragging = flag;
    }

    public get restrictsScaling(): boolean
    {
        return this._restrictsScaling;
    }

    public set restrictsScaling(flag: boolean)
    {
        this._restrictsScaling = flag;
    }

    public get restrictedScale(): number
    {
        return this._restrictedScale;
    }

    public set restrictedScale(scale: number)
    {
        this._restrictedScale = scale;
    }
}
