import { IRoomMapData } from '@nitrots/api';

export class RoomMapData implements IRoomMapData
{
    private _width: number;
    private _height: number;
    private _wallHeight: number;
    private _fixedWallsHeight: number;
    private _tileMap: { height: number }[][];
    private _holeMap: { id: number, x: number, y: number, width: number, height: number, invert: boolean }[];
    private _doors: { x: number, y: number, z: number, dir: number }[];
    private _dimensions: { minX: number, maxX: number, minY: number, maxY: number };

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

    public get holeMap(): { id: number, x: number, y: number, width: number, height: number, invert: boolean }[]
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
}
