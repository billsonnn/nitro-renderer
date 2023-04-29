import { ILegacyWallGeometry, IVector3D, Vector3d } from '../../../api';

export class LegacyWallGeometry implements ILegacyWallGeometry
{
    public static DEFAULT_SCALE: number = 32;

    private static L: string = 'l';
    private static R: string = 'r';

    private _isDisposed: boolean;
    private _scale: number;
    private _heightMap: number[][];
    private _width: number;
    private _height: number;
    private _floorHeight: number;

    constructor()
    {
        this._isDisposed = false;
        this._scale = 64;
        this._heightMap = [];
        this._width = 0;
        this._height = 0;
        this._floorHeight = 0;
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    public get scale(): number
    {
        return this._scale;
    }

    public set scale(k: number)
    {
        this._scale = k;
    }

    public dispose(): void
    {
        this.reset();
        this._isDisposed = true;
    }

    public initialize(width: number, height: number, floorHeight: number): void
    {
        if((width <= this._width) && (height <= this._height))
        {
            this._width = width;
            this._height = height;
            this._floorHeight = floorHeight;

            return;
        }

        this.reset();

        let y = 0;

        while(y < height)
        {
            const heights: number[] = [];

            this._heightMap.push(heights);

            let x = 0;

            while(x < width)
            {
                heights.push(0);

                x++;
            }

            y++;
        }

        this._width = width;
        this._height = height;
        this._floorHeight = floorHeight;
    }

    private reset(): void
    {
        this._heightMap = [];
    }

    public setHeight(x: number, y: number, height: number): boolean
    {
        if((((x < 0) || (x >= this._width)) || (y < 0)) || (y >= this._height)) return false;

        const heightMap = this._heightMap[y];

        if(!heightMap) return false;

        heightMap[x] = height;

        return true;
    }

    public getHeight(x: number, y: number): number
    {
        if((((x < 0) || (x >= this._width)) || (y < 0)) || (y >= this._height)) return 0;

        const heightMap = this._heightMap[y];

        if(!heightMap) return 0;

        return heightMap[x];
    }

    public getLocation(width: number, height: number, localX: number, localY: number, direction: string): IVector3D
    {
        let _local_7: number;
        if(((width == 0) && (height == 0)))
        {
            width = this._width;
            height = this._height;
            const _local_12 = Math.round((this.scale / 10));
            if(direction == LegacyWallGeometry.R)
            {
                let _local_7 = (this._width - 1);
                while(_local_7 >= 0)
                {
                    let _local_6 = 1;
                    while(_local_6 < this._height)
                    {
                        if(this.getHeight(_local_7, _local_6) <= this._floorHeight)
                        {
                            if((_local_6 - 1) < height)
                            {
                                width = _local_7;
                                height = (_local_6 - 1);
                            }
                            break;
                        }
                        _local_6++;
                    }
                    _local_7--;
                }
                localY = (localY + ((this.scale / 4) - (_local_12 / 2)));
                localX = (localX + (this.scale / 2));
            }
            else
            {
                let _local_6 = (this._height - 1);
                while(_local_6 >= 0)
                {
                    let _local_7 = 1;
                    while(_local_7 < this._width)
                    {
                        if(this.getHeight(_local_7, _local_6) <= this._floorHeight)
                        {
                            if((_local_7 - 1) < width)
                            {
                                width = (_local_7 - 1);
                                height = _local_6;
                            }
                            break;
                        }
                        _local_7++;
                    }
                    _local_6--;
                }
                localY = (localY + ((this.scale / 4) - (_local_12 / 2)));
                localX = (localX - _local_12);
            }
        }
        let _local_8: number = width;
        let _local_9: number = height;
        let _local_10: number = this.getHeight(width, height);
        if(direction == LegacyWallGeometry.R)
        {
            _local_8 = (_local_8 + ((localX / (this._scale / 2)) - 0.5));
            _local_9 = (_local_9 + 0.5);
            _local_10 = (_local_10 - ((localY - (localX / 2)) / (this._scale / 2)));
        }
        else
        {
            _local_9 = (_local_9 + ((((this._scale / 2) - localX) / (this._scale / 2)) - 0.5));
            _local_8 = (_local_8 + 0.5);
            _local_10 = (_local_10 - ((localY - (((this._scale / 2) - localX) / 2)) / (this._scale / 2)));
        }
        const _local_11: Vector3d = new Vector3d(_local_8, _local_9, _local_10);
        return _local_11;
    }

    public getLocationOldFormat(k: number, _arg_2: number, _arg_3: string): IVector3D
    {
        let _local_4: number;
        let _local_5: number;
        let _local_6 = 0;
        let _local_7 = 0;
        _local_5 = Math.ceil(k);
        _local_6 = (_local_5 - k);
        let _local_8: number;
        let _local_9: number;
        let _local_11: number;
        let _local_12 = 0;
        _local_4 = 0;
        while(_local_4 < this._width)
        {
            if(((_local_5 >= 0) && (_local_5 < this._height)))
            {
                if(this.getHeight(_local_4, _local_5) <= this._floorHeight)
                {
                    _local_8 = (_local_4 - 1);
                    _local_9 = _local_5;
                    _local_7 = _local_4;
                    _arg_3 = LegacyWallGeometry.L;
                    break;
                }
                if(this.getHeight(_local_4, (_local_5 + 1)) <= this._floorHeight)
                {
                    _local_8 = _local_4;
                    _local_9 = _local_5;
                    _local_7 = (_local_9 - k);
                    _arg_3 = LegacyWallGeometry.R;
                    break;
                }
            }
            _local_5++;
            _local_4++;
        }
        const _local_10 = ((this.scale / 2) * _local_6);
        let _local_13: number = ((-(_local_7) * this.scale) / 2);
        _local_13 = (_local_13 + ((((-(_arg_2) * 18) / 32) * this.scale) / 2));
        _local_12 = this.getHeight(_local_8, _local_9);
        _local_11 = (((_local_12 * this.scale) / 2) + _local_13);
        if(_arg_3 == LegacyWallGeometry.R)
        {
            _local_11 = (_local_11 + ((_local_6 * this.scale) / 4));
        }
        else
        {
            _local_11 = (_local_11 + (((1 - _local_6) * this.scale) / 4));
        }
        return this.getLocation(_local_8, _local_9, _local_10, _local_11, _arg_3);
    }

    public getOldLocation(k: IVector3D, _arg_2: number): [number, number, number, number, string]
    {
        if(k == null)
        {
            return null;
        }
        let _local_3 = 0;
        let _local_4 = 0;
        let _local_5 = 0;
        let _local_6 = 0;
        let _local_7 = '';
        let _local_8 = 0;
        if(_arg_2 == 90)
        {
            _local_3 = Math.floor((k.x - 0.5));
            _local_4 = Math.floor((k.y + 0.5));
            _local_8 = this.getHeight(_local_3, _local_4);
            _local_5 = ((this._scale / 2) - (((k.y - _local_4) + 0.5) * (this._scale / 2)));
            _local_6 = (((_local_8 - k.z) * (this._scale / 2)) + (((this._scale / 2) - _local_5) / 2));
            _local_7 = LegacyWallGeometry.L;
        }
        else
        {
            if(_arg_2 == 180)
            {
                _local_3 = Math.floor((k.x + 0.5));
                _local_4 = Math.floor((k.y - 0.5));
                _local_8 = this.getHeight(_local_3, _local_4);
                _local_5 = (((k.x + 0.5) - _local_3) * (this._scale / 2));
                _local_6 = (((_local_8 - k.z) * (this._scale / 2)) + (_local_5 / 2));
                _local_7 = LegacyWallGeometry.R;
            }
            else
            {
                return null;
            }
        }
        return [_local_3, _local_4, _local_5, _local_6, _local_7];
    }

    public getOldLocationString(k: IVector3D, _arg_2: number): string
    {
        const _local_3 = this.getOldLocation(k, _arg_2);
        if(_local_3 == null)
        {
            return null;
        }
        const _local_4: number = Math.trunc(_local_3[0]);
        const _local_5: number = Math.trunc(_local_3[1]);
        const _local_6: number = Math.trunc(_local_3[2]);
        const _local_7: number = Math.trunc(_local_3[3]);
        const _local_8: string = _local_3[4];
        const _local_9: string = (((((((((':w=' + _local_4) + ',') + _local_5) + ' l=') + _local_6) + ',') + _local_7) + ' ') + _local_8);
        return _local_9;
    }

    public getDirection(k: string): number
    {
        if(k == LegacyWallGeometry.R)
        {
            return 180;
        }
        return 90;
    }

    public getFloorAltitude(k: number, _arg_2: number): number
    {
        const _local_3 = this.getHeight(k, _arg_2);
        const _local_4 = (_local_3 + 1);

        return _local_3 + (((((((((Math.trunc(this.getHeight((k - 1), (_arg_2 - 1))) == _local_4) || (Math.trunc(this.getHeight(k, (_arg_2 - 1))) == _local_4)) || (Math.trunc(this.getHeight((k + 1), (_arg_2 - 1))) == _local_4)) || (Math.trunc(this.getHeight((k - 1), _arg_2)) == _local_4)) || (Math.trunc(this.getHeight((k + 1), _arg_2)) == _local_4)) || (Math.trunc(this.getHeight((k - 1), (_arg_2 + 1))) == _local_4)) || (Math.trunc(this.getHeight(k, (_arg_2 + 1))) == _local_4)) || (Math.trunc(this.getHeight((k + 1), (_arg_2 + 1))) == _local_4)) ? 0.5 : 0);
    }

    public isRoomTile(k: number, _arg_2: number): boolean
    {
        return ((((k >= 0) && (k < this._width)) && (_arg_2 >= 0)) && (_arg_2 < this._height)) && (this._heightMap[_arg_2][k] >= 0);
    }
}
