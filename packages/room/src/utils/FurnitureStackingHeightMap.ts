import { IFurnitureStackingHeightMap } from '@nitrots/api';

export class FurnitureStackingHeightMap implements IFurnitureStackingHeightMap
{
    private _width: number;
    private _height: number;
    private _heights: number[];
    private _isNotStackable: boolean[];
    private _isRoomTile: boolean[];

    constructor(width: number, height: number)
    {
        this._width = width;
        this._height = height;
        this._heights = [];
        this._isNotStackable = [];
        this._isRoomTile = [];

        let total = (width * height);

        while(total > 0)
        {
            this._heights.push(0);
            this._isNotStackable.push(false);
            this._isRoomTile.push(false);

            total--;
        }
    }

    public dispose(): void
    {
        this._width = 0;
        this._height = 0;
        this._height = null;
        this._isNotStackable = null;
        this._isRoomTile = null;
    }

    private validPosition(x: number, y: number): boolean
    {
        return (((x >= 0) && (x < this._width)) && (y >= 0)) && (y < this._height);
    }

    public getTileHeight(x: number, y: number): number
    {
        return ((this.validPosition(x, y)) ? this._heights[((y * this._width) + x)] : 0);
    }

    public setTileHeight(x: number, y: number, height: number): void
    {
        if(this.validPosition(x, y)) this._heights[((y * this._width) + x)] = height;
    }

    public setStackingBlocked(x: number, y: number, isNotStackable: boolean): void
    {
        if(this.validPosition(x, y)) this._isNotStackable[((y * this._width) + x)] = isNotStackable;
    }

    public setIsRoomTile(x: number, y: number, isRoomTile: boolean): void
    {
        if(this.validPosition(x, y)) this._isRoomTile[((y * this._width) + x)] = isRoomTile;
    }

    public validateLocation(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: number, _arg_7: number, _arg_8: number, _arg_9: boolean, _arg_10: number = -1): boolean
    {
        let _local_12 = 0;
        let _local_13 = 0;

        if(!this.validPosition(k, _arg_2) || !this.validPosition(((k + _arg_3) - 1), ((_arg_2 + _arg_4) - 1))) return false;

        if(((_arg_5 < 0) || (_arg_5 >= this._width))) _arg_5 = 0;

        if(((_arg_6 < 0) || (_arg_6 >= this._height))) _arg_6 = 0;

        _arg_7 = Math.min(_arg_7, (this._width - _arg_5));
        _arg_8 = Math.min(_arg_8, (this._height - _arg_6));

        if(_arg_10 === -1) _arg_10 = this.getTileHeight(k, _arg_2);

        let _local_11 = _arg_2;

        while(_local_11 < (_arg_2 + _arg_4))
        {
            _local_12 = k;

            while(_local_12 < (k + _arg_3))
            {
                if(((((_local_12 < _arg_5) || (_local_12 >= (_arg_5 + _arg_7))) || (_local_11 < _arg_6)) || (_local_11 >= (_arg_6 + _arg_8))))
                {
                    _local_13 = ((_local_11 * this._width) + _local_12);

                    if(_arg_9)
                    {
                        if(!this._isRoomTile[_local_13]) return false;
                    }
                    else
                    {
                        if(((this._isNotStackable[_local_13]) || (!(this._isRoomTile[_local_13]))) || (Math.abs((this._heights[_local_13] - _arg_10)) > 0.01)) return false;
                    }
                }

                _local_12++;
            }

            _local_11++;
        }

        return true;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }
}
