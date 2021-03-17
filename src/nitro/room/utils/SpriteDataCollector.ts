import { Point, Rectangle } from 'pixi.js';
import { RoomObjectSpriteData } from '../../../room/data/RoomObjectSpriteData';
import { IPlaneDrawingData } from '../../../room/object/visualization/IPlaneDrawingData';
import { IPlaneVisualization } from '../../../room/object/visualization/IPlaneVisualization';
import { IRoomObjectSpriteVisualization } from '../../../room/object/visualization/IRoomObjectSpriteVisualization';
import { IRoomPlane } from '../../../room/object/visualization/IRoomPlane';
import { IRoomRenderingCanvas } from '../../../room/renderer/IRoomRenderingCanvas';
import { Vector3d } from '../../../room/utils/Vector3d';
import { Nitro } from '../../Nitro';
import { RoomObjectCategory } from '../object/RoomObjectCategory';
import { PlaneDrawingData } from '../object/visualization/room/PlaneDrawingData';
import { RoomEngine } from '../RoomEngine';

export class SpriteDataCollector
{
    private static _Str_16967: number   = 1;
    private static _Str_18197: number   = -16;
    private static _Str_18565: number   = -52;
    private static _Str_17558: number   = 30;

    private _Str_6409: number;
    private _Str_3008: number = 0;
    private _Str_18433: number = 0;

    private static _Str_22230(k: RoomObjectSpriteData[], _arg_2: RoomEngine): RoomObjectSpriteData[]
    {
        const datas: RoomObjectSpriteData[] = [];

        for(const data of k)
        {
            if(!data) continue;

            if((data.type === 'boutique_mannequin1') && (data.name.indexOf('mannequin_') === 0))
            {
                const roomObject = _arg_2.getRoomObject(_arg_2.activeRoomId, data.objectId, RoomObjectCategory.FLOOR);

                if(roomObject)
                {
                    const spriteList = (roomObject.visualization as IRoomObjectSpriteVisualization).getSpriteList();

                    if(spriteList)
                    {
                        for(const sprite of spriteList)
                        {
                            sprite.x = (sprite.x + ((data.x + (data.width / 2)) + SpriteDataCollector._Str_16967));
                            sprite.y = (sprite.y + ((data.y + data.height) + SpriteDataCollector._Str_18197));
                            sprite.z = (sprite.z + data.z);
                            datas.push(sprite);
                        }
                    }
                }
            }
            else
            {
                datas.push(data);
            }
        }

        return datas;
    }

    private static _Str_22564(k: RoomObjectSpriteData, _arg_2: RoomObjectSpriteData): number
    {
        if(k.z < _arg_2.z) return 1;

        if(k.z > _arg_2.z) return -1;

        return -1;
    }

    private static _Str_20789(k:RoomObjectSpriteData, _arg_2: Rectangle, _arg_3: IRoomRenderingCanvas): boolean
    {
        return true;
        // var _local_4 = new Rectangle((k.x + _arg_3.screenOffsetX), (k.y + _arg_3.screenOffsetY), k.width, k.height);
        // // intersects
        // return _local_4.contains(_arg_2.x, _arg_2.y);
    }

    private static _Str_14110(k: Point, _arg_2: Point, _arg_3: Point, _arg_4: Point): Point[]
    {
        const points: Point[] = [];

        if(k.x == _arg_2.x)
        {
            points.push(k, _arg_3, _arg_2, _arg_4);
        }
        else
        {
            if(k.x == _arg_3.x)
            {
                points.push(k, _arg_2, _arg_3, _arg_4);
            }
            else
            {
                if((((_arg_2.x < k.x) && (_arg_2.y > k.y)) || ((_arg_2.x > k.x) && (_arg_2.y < k.y))))
                {
                    points.push(k, _arg_3, _arg_2, _arg_4);
                }
                else
                {
                    points.push(k, _arg_2, _arg_3, _arg_4);
                }
            }
        }

        if(points[0].x < points[1].x)
        {
            let _local_6 = points[0];

            points[0] = points[1];
            points[1] = _local_6;

            _local_6 = points[2];

            points[2] = points[3];
            points[3] = _local_6;
        }

        if(points[0].y < points[2].y)
        {
            let _local_6 = points[0];

            points[0] = points[2];
            points[2] = _local_6;

            _local_6 = points[1];

            points[1] = points[3];
            points[3] = _local_6;
        }

        return points;
    }


    public _Str_4536(k: Rectangle, _arg_2:IRoomRenderingCanvas, _arg_3:RoomEngine, _arg_4: number): string
    {
        const _local_5: Object[] = [];
        let _local_6 = _arg_2.getSortableSpriteList();

        const _local_7 = _arg_3._Str_21072(_arg_3.activeRoomId, RoomObjectCategory.UNIT);

        for(const _local_8 of _local_7)
        {
            if(_local_8.id !== _arg_4)
            {
                const _local_11 = (_local_8.visualization as IRoomObjectSpriteVisualization).getSpriteList();

                if(_local_11)
                {
                    let _local_12 = 0;
                    let _local_13 = 0;

                    for(const _local_14 of _local_6)
                    {
                        if(_local_14.name === ('avatar_' + _local_8.id))
                        {
                            _local_12 = _local_14.z;
                            _local_13 = ((_local_14.y + _local_14.height) - (_arg_2.geometry.scale / 4));

                            break;
                        }
                    }

                    const _local_15 = _arg_3.getRoomObjectScreenLocation(_arg_3.activeRoomId, _local_8.id, RoomObjectCategory.UNIT, _arg_2.id);

                    if(_local_15)
                    {
                        if(_local_13 === 0) _local_13 = _local_15.y;

                        for(const _local_16 of _local_11)
                        {
                            _local_16.x = (_local_16.x + (_local_15.x - _arg_2.screenOffsetX));
                            _local_16.y = (_local_16.y + _local_13);
                            _local_16.z = (_local_16.z + _local_12);

                            if(((_local_16.name.indexOf('h_std_fx29_') === 0) || (_local_16.name.indexOf('h_std_fx185_') === 0)))
                            {
                                _local_16.y = (_local_16.y + SpriteDataCollector._Str_18565);
                            }

                            _local_6.push(_local_16);
                        }
                    }
                }
            }
        }

        _local_6 = SpriteDataCollector._Str_22230(_local_6, _arg_3);
        _local_6.sort(SpriteDataCollector._Str_22564);

        for(const _local_9 of _local_6)
        {
            if((((((!(_local_9.name === null)) && (_local_9.name.length > 0)) && (!(_local_9.name.indexOf('tile_cursor_') === 0))) && (SpriteDataCollector._Str_20789(_local_9, k, _arg_2))) && ((_arg_4 < 0) || (!(_local_9.objectId == _arg_4)))))
            {
                _local_5.push(this._Str_25132(_local_9, k, _arg_2, _arg_3));

                if(!this._Str_6409) this._Str_6409 = _local_9.z;

                this._Str_3008++;
            }
        }

        return JSON.stringify(_local_5);
    }

    public _Str_24177(k: RoomEngine): string
    {
        return JSON.stringify(new Object());
    }

    private _Str_25132(k: RoomObjectSpriteData, _arg_2: Rectangle, _arg_3: IRoomRenderingCanvas, _arg_4: RoomEngine): Object
    {
        let _local_7: string = null;
        let _local_9: string[] = [];

        const _local_5: {
            name?: string,
            x?: number,
            y?: number,
            z?: number,
            alpha?: number,
            flipH?: boolean,
            skew?: number,
            frame?: boolean,
            color?: number,
            blendMode?: string,
            width?: number,
            height?: number,
            posture?: string
        } = {};

        let _local_6 = k.name;

        if(k.name.indexOf('@') !== -1)
        {
            _local_9 = k.name.split('@');
            _local_6 = _local_9[0];
            _local_7 = _local_9[1];
        }

        // if(((_local_7) && (k.type)))
        // {
        //     const _local_10 = _arg_4.roomContentLoader.getCollection(k.type);

        //     if(_local_10)
        //     {
        //         const _local_11 = _local_10.getPalette(_local_7);

        //         if (((!(_local_11 == null)) && (!(_local_11.@source == null))))
        //         {
        //             _local_5.paletteSourceName = (_local_11.@source + '');
        //         }
        //     }
        // }

        // var _local_8:String = _arg_4.configuration.getProperty('image.library.url');
        // _local_6 = _local_6.replace('%image.library.url%', _local_8);
        // if (_local_6.indexOf('%group.badge.url%') != -1)
        // {
        //     _local_12 = _arg_4.configuration.getProperty('group.badge.url');
        //     _local_6 = _local_6.replace('%group.badge.url%', '');
        //     _local_13 = _local_12.replace('%imagerdata%', _local_6);
        //     _local_6 = _local_13;
        // }

        _local_5.name = _local_6;
        _local_5.x = (k.x - _arg_2.x);
        _local_5.y = (k.y - _arg_2.y);
        _local_5.x = (_local_5.x + _arg_3.screenOffsetX);
        _local_5.y = (_local_5.y + _arg_3.screenOffsetY);
        _local_5.z = k.z;

        if(k.alpha && (k.alpha.toString() !== '255')) _local_5.alpha = k.alpha;

        if(k.flipH) _local_5.flipH = k.flipH;

        if(k.skew) _local_5.skew = k.skew;

        if(k.frame) _local_5.frame = k.frame;

        if(k.color && (k.color.length > 0)) _local_5.color = parseInt(k.color);

        if(k.blendMode && (k.blendMode !== 'normal')) _local_5.blendMode = k.blendMode;

        if(_local_6.indexOf('http') === 0)
        {
            _local_5.width  = k.width;
            _local_5.height = k.height;

            this._Str_18433++;

            if(this._Str_18433 > SpriteDataCollector._Str_17558) _local_5.name = 'box';
        }

        if(k.posture) _local_5.posture = k.posture;

        return _local_5;
    }

    private _Str_25196(k: Rectangle, _arg_2: number, _arg_3: IPlaneDrawingData[]): PlaneDrawingData
    {
        const _local_4 = new Point(0, 0);
        const _local_5 = new Point(k.width, 0);
        const _local_6 = new Point(0, k.height);
        const _local_7 = new Point(k.width, k.height);
        const _local_8 = SpriteDataCollector._Str_14110(_local_4, _local_5, _local_6, _local_7);

        let _local_9 = 0;

        if(_arg_3.length > 0)
        {
            _local_9 = _arg_3[0].z;

            if(this._Str_6409) _local_9 = Math.max(this._Str_6409, _local_9);
        }
        else
        {
            _local_9 = ((this._Str_6409) ? this._Str_6409 : 0);
        }

        _local_9 = (_local_9 + ((this._Str_3008 * 1.776104) + (_arg_3.length * 2.31743)));

        const _local_10 = new PlaneDrawingData(null, _arg_2);

        _local_10.cornerPoints  = _local_8;
        _local_10.z             = _local_9;

        return _local_10;
    }

    private _Str_25623(k: IRoomPlane[], _arg_2: IRoomRenderingCanvas, _arg_3: RoomEngine): { plane: IRoomPlane, z: number }[]
    {
        const _local_4: Map<number, { plane: IRoomPlane, z: number }> = new Map();

        let _local_5 = 1;

        if(this._Str_6409)
        {
            _local_5 = (_local_5 + this._Str_6409);
        }

        for(const _local_6 of k)
        {
            const _local_10 = {
                plane: _local_6,
                z: _local_5
            };

            _local_4.set(_local_6.uniqueId, _local_10);
        }

        const sprites = _arg_2._Str_14588();

        sprites.sort((a, b) =>
        {
            return (b.z - a.z);
        });

        sprites.reverse();

        let _local_8: { plane: IRoomPlane, z: number }[] = [];

        for(const sprite of sprites)
        {
            const objectSprite = sprite.sprite;

            if(objectSprite)
            {
                const _local_10 = _local_4.get(objectSprite.id);

                if(_local_10)
                {
                    _local_4.delete(objectSprite.id);

                    _local_10.z = sprite.z;

                    _local_8.push(_local_10);
                }
            }
        }

        _local_8 = _local_8.concat(Array.from(_local_4.values()));

        return _local_8;
    }

    public _Str_22985(k: Rectangle, _arg_2: IRoomRenderingCanvas, _arg_3: RoomEngine, _arg_4: number): PlaneDrawingData[]
    {
        const _local_5: PlaneDrawingData[] = [];

        const roomObject    = _arg_3.getRoomObject(_arg_3.activeRoomId, RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM);
        const visualization = (roomObject.visualization as unknown as IPlaneVisualization);

        if(visualization)
        {
            const _local_8  = _arg_2.geometry;
            const _local_9  = this._Str_25623(visualization._Str_19113, _arg_2, _arg_3);
            const _local_10 = Nitro.instance.stage;

            for(const _local_11 of _local_9)
            {
                const _local_12 = _local_11.plane;
                const _local_13: Point[] = [];

                const _local_14 = Vector3d.sum(_local_12.location, _local_12._Str_5424);
                const _local_15 = _local_8.getScreenPoint(_local_12.location);
                const _local_16 = _local_8.getScreenPoint(_local_14);
                const _local_17 = _local_8.getScreenPoint(Vector3d.sum(_local_12.location, _local_12._Str_4968));
                const _local_18 = _local_8.getScreenPoint(Vector3d.sum(_local_14, _local_12._Str_4968));

                _local_13.push(_local_15, _local_16, _local_17, _local_18);

                let _local_19 = 0;
                let _local_20 = 0;

                for(const _local_21 of _local_13)
                {
                    _local_21.x += (_local_10.width / 2);
                    _local_21.y += (_local_10.height / 2);

                    _local_21.x += _arg_2.screenOffsetX;
                    _local_21.y += _arg_2.screenOffsetY;

                    _local_21.x += -(k.x);
                    _local_21.y += -(k.y);

                    if(_local_21.x < 0) _local_19--;

                    else if(_local_21.x >= k.width) _local_19++;

                    if(_local_21.y < 0) _local_20--;

                    else if(_local_21.y >= k.height) _local_20++;
                }

                if(((Math.abs(_local_19) === 4) || (Math.abs(_local_20) === 4)))
                {
                    //
                }
                else
                {
                    const _local_22 = SpriteDataCollector._Str_14110(_local_15, _local_16, _local_17, _local_18);

                    for(const _local_23 of _local_12._Str_22136(_local_8))
                    {
                        _local_23.cornerPoints  = _local_22;
                        _local_23.z             = _local_11.z;

                        _local_5.push(_local_23);
                    }
                }
            }

            _local_5.unshift(this._Str_25196(k, _arg_4, _local_5));
        }

        return _local_5;
    }
}
