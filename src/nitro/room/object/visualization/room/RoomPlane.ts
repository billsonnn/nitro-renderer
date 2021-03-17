import { Graphics, Matrix, Point, Rectangle, RenderTexture, Texture } from 'pixi.js';
import { IRoomPlane } from '../../../../../room/object/visualization/IRoomPlane';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { IVector3D } from '../../../../../room/utils/IVector3D';
import { TextureUtils } from '../../../../../room/utils/TextureUtils';
import { Vector3d } from '../../../../../room/utils/Vector3d';
import { Nitro } from '../../../../Nitro';
import { PlaneMaskManager } from './mask/PlaneMaskManager';
import { PlaneDrawingData } from './PlaneDrawingData';
import { PlaneVisualizationLayer } from './rasterizer/basic/PlaneVisualizationLayer';
import { IPlaneRasterizer } from './rasterizer/IPlaneRasterizer';
import { RoomPlaneBitmapMask } from './RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from './RoomPlaneRectangleMask';
import { RoomVisualization } from './RoomVisualization';
import { PlaneBitmapData } from './utils/PlaneBitmapData';
import { Randomizer } from './utils/Randomizer';

export class RoomPlane implements IRoomPlane
{
    private static ZERO_POINT: Point = new Point(0, 0);
    public static TYPE_UNDEFINED: number = 0;
    public static TYPE_WALL: number = 1;
    public static TYPE_FLOOR: number = 2;
    public static TYPE_LANDSCAPE: number = 3;
    private static _uniqueIdCounter: number = 1;

    private _disposed: boolean;
    private _Str_16308: number;
    private _Str_5221: Vector3d;
    private _location: Vector3d;
    private _Str_2920: Vector3d;
    private _Str_2943: Vector3d;
    private _normal: Vector3d;
    private _Str_5886: Vector3d[];
    private _Str_3406: number;
    private _type: number;
    private _Str_3816: boolean;
    private _Str_1049: Graphics;
    private _Str_13946: boolean;
    private _offset: Point;
    private _relativeDepth: number;
    private _color: number;
    private _rasterizer: IPlaneRasterizer;
    private _Str_4795: PlaneMaskManager = null;
    private _Str_576: string;
    private _uniqueId: number;
    private _Str_20541: number;
    private _Str_19707: number;
    private _Str_21079: number;
    private _Str_22024: number;
    private _Str_2708: Map<string, PlaneBitmapData>;
    private _Str_5545: PlaneBitmapData;
    private _Str_4542: boolean;
    private _Str_4047: RoomPlaneBitmapMask[];
    private _Str_5088: RoomPlaneRectangleMask[];
    private _Str_4891: boolean;
    private _Str_2730: Graphics;
    private _Str_8341: RoomPlaneBitmapMask[];
    private _Str_14495: RoomPlaneRectangleMask[];
    private _Str_2820:Vector3d;
    private _Str_2745:Vector3d;
    private _Str_2639:Vector3d;
    private _Str_2766:Vector3d;
    private _Str_1720: number = 0;
    private _height: number = 0;
    private _Str_7367: boolean;

    constructor(k: IVector3D, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D, _arg_5: number, _arg_6: boolean, _arg_7: IVector3D[], _arg_8: number, _arg_9: number=0, _arg_10: number=0, _arg_11: number=0, _arg_12: number=0)
    {
        this._Str_5886 = [];
        this._Str_4047 = [];
        this._Str_5088 = [];
        this._Str_8341 = [];
        this._Str_14495 = [];
        this._Str_16308 = _arg_8;
        this._Str_1049  = null;
        this._Str_2730  = null;
        this._Str_4891  = false;
        this._Str_5545  = null;
        this._Str_5221 = new Vector3d();
        this._Str_5221.assign(k);
        this._location = new Vector3d();
        this._location.assign(_arg_2);
        this._Str_2920 = new Vector3d();
        this._Str_2920.assign(_arg_3);
        this._Str_2943 = new Vector3d();
        this._Str_2943.assign(_arg_4);
        this._normal = Vector3d.crossProduct(this._Str_2920, this._Str_2943);
        if(this._normal.length > 0)
        {
            this._normal.multiply((1 / this._normal.length));
        }
        if(_arg_7 != null)
        {
            for(const entry of _arg_7)
            {
                if(!entry) continue;

                const vector = new Vector3d();

                vector.assign(entry);

                this._Str_5886.push(vector);
            }
        }
        this._disposed  = false;
        this._Str_3816  = false;
        this._Str_576   = null;
        this._Str_13946 = true;
        this._Str_3406  = -1;
        this._offset = new Point();
        this._relativeDepth = 0;
        this._type = _arg_5;
        this._color     = 0;
        this._rasterizer    = null;
        this._Str_7367  = true;
        this._Str_2708 = new Map();
        this._Str_2820 = new Vector3d();
        this._Str_2745 = new Vector3d();
        this._Str_2639 = new Vector3d();
        this._Str_2766 = new Vector3d();
        this._Str_1720  = 0;
        this._height    = 0;
        this._Str_20541 = _arg_9;
        this._Str_19707 = _arg_10;
        this._Str_21079 = _arg_11;
        this._Str_22024 = _arg_12;
        this._Str_4542 = _arg_6;
        this._uniqueId = ++RoomPlane._uniqueIdCounter;
    }

    private static blend(k: number, _arg_2: number): number
    {
        return 0;
        //return Canvas.colorize(_arg_2, (k | 0xFF000000)) & 0xFFFFFF;
    }

    public set _Str_14801(k: boolean)
    {
        if(k !== this._Str_7367)
        {
            if(!this._Str_7367) this._Str_11000();

            this._Str_7367 = k;
        }
    }

    public get _Str_14801(): boolean
    {
        return this._Str_7367;
    }

    public get bitmapData(): Texture
    {
        if(!this.visible || !this._Str_1049) return null;

        let texture: RenderTexture = RoomVisualization.getTextureCache(this._Str_1049);

        if(!texture)
        {
            texture = TextureUtils.generateTexture(this._Str_1049, new Rectangle(0, 0, this._Str_1720, this._height));

            RoomVisualization.addTextureCache(this._Str_1049, texture);
        }

        return texture;
    }

    public get visible(): boolean
    {
        return (this._Str_3816 && this._Str_7367);
    }

    public get offset(): Point
    {
        return this._offset;
    }

    public get relativeDepth(): number
    {
        return this._relativeDepth;
    }

    public get color(): number
    {
        return this._color;
    }

    public set color(k: number)
    {
        this._color = k;
    }

    public get type(): number
    {
        return this._type;
    }

    public get _Str_5424(): IVector3D
    {
        return this._Str_2920;
    }

    public get _Str_4968(): IVector3D
    {
        return this._Str_2943;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get normal(): IVector3D
    {
        return this._normal;
    }

    public get _Str_18448(): boolean
    {
        return this._Str_13946;
    }

    public set _Str_18448(k: boolean)
    {
        this._Str_13946 = k;
    }

    public set rasterizer(k:IPlaneRasterizer)
    {
        this._rasterizer = k;
    }

    public set _Str_16279(k: PlaneMaskManager)
    {
        this._Str_4795 = k;
    }

    public set id(k: string)
    {
        if(k === this._Str_576) return;

        this._Str_11000();
        this._Str_576 = k;
    }

    public get uniqueId(): number
    {
        return this._uniqueId;
    }

    public dispose(): void
    {
        if(this._Str_1049)
        {
            this._Str_1049.destroy();

            this._Str_1049 = null;
        }

        if(this._Str_2708)
        {
            for(const bitmap of this._Str_2708.values())
            {
                if(!bitmap) continue;

                if(bitmap.bitmap) bitmap.bitmap.destroy();

                bitmap.dispose();
            }

            this._Str_2708 = null;
        }

        this._Str_5545      = null;
        this._location      = null;
        this._Str_5221      = null;
        this._Str_2920      = null;
        this._Str_2943      = null;
        this._normal        = null;
        this._rasterizer    = null;
        this._Str_2820      = null;
        this._Str_2745      = null;
        this._Str_2639      = null;
        this._Str_2766      = null;
        this._Str_4047      = null;
        this._Str_5088      = null;

        if(this._Str_2730)
        {
            this._Str_2730.destroy();

            this._Str_2730 = null;
        }

        this._disposed = true;
    }

    public _Str_24896(k: Texture): Texture
    {
        if(!this.visible || !this._Str_1049 || !k) return null;

        if((this._Str_1049.width !== k.width) || (this._Str_1049.height !== k.height)) return null;

        //k.copyPixels(this._Str_1049, this._Str_1049.rect, RoomPlane.ZERO_POINT);
        return k;
    }

    private _Str_17642(k: string, _arg_2: PlaneBitmapData): boolean
    {
        const existing = this._Str_2708.get(k);

        if(existing)
        {
            this._Str_2708.delete(k);

            existing.dispose();
        }

        this._Str_5545 = _arg_2;
        this._Str_2708.set(k, _arg_2);

        return true;
    }

    private _Str_11000(k: Graphics = null): void
    {
        if(this._Str_2708 && this._Str_2708.size)
        {
            for(const bitmap of this._Str_2708.values())
            {
                if(!bitmap) continue;

                bitmap.dispose();
            }

            this._Str_2708.clear();
        }

        this._Str_5545 = null;
    }

    private getTextureIdentifier(k: number): string
    {
        if(this._rasterizer) return this._rasterizer.getTextureIdentifier(k, this.normal);

        return k.toString();
    }

    private _Str_10518(k: IRoomGeometry, _arg_2: number): boolean
    {
        if(!k) return false;

        let planeBitmap = this._Str_5545;

        if(!planeBitmap)
        {
            planeBitmap = this._Str_2708.get(this.getTextureIdentifier(k.scale));
        }

        this._Str_19336();

        if(this._Str_7367 && ((!planeBitmap || ((planeBitmap.timeStamp >= 0) && (_arg_2 > planeBitmap.timeStamp))) || this._Str_4891)) return true;

        return false;
    }

    private _Str_10114(k: IRoomGeometry, _arg_2: number): Graphics
    {
        if(!k) return null;

        let _local_3: PlaneBitmapData = null;

        if(this._Str_10518(k, _arg_2))
        {
            const _local_4 = this.getTextureIdentifier(k.scale);
            const _local_5 = (this._Str_2920.length * k.scale);
            const _local_6 = (this._Str_2943.length * k.scale);
            const _local_7 = k.getCoordinatePosition(this._normal);

            if(this._Str_5545)
            {
                _local_3 = this._Str_5545;
            }
            else
            {
                _local_3 = this._Str_2708.get(_local_4);
            }

            let _local_8: Graphics = null;

            if(_local_3) _local_8 = _local_3.bitmap;

            if(this._rasterizer)
            {
                _local_3 = this._rasterizer.render(_local_8, this._Str_576, _local_5, _local_6, k.scale, _local_7, this._Str_13946, this._Str_20541, this._Str_19707, this._Str_21079, this._Str_22024, _arg_2);

                if(_local_3)
                {
                    if(_local_8 && (_local_3.bitmap !== _local_8)) _local_8.destroy();
                }
            }
            else
            {
                const _local_9 = new Graphics();

                _local_9.beginFill(0xFFFFFF);
                _local_9.drawRect(0, 0, _local_5, _local_6);
                _local_9.endFill();

                _local_3 = new PlaneBitmapData(_local_9, -1);
            }

            if(_local_3)
            {
                this._Str_17859(_local_3.bitmap, k);
                this._Str_17642(_local_4, _local_3);
            }
        }
        else
        {
            if(this._Str_5545)
            {
                _local_3 = this._Str_5545;
            }
            else
            {
                _local_3 = this._Str_2708.get(this.getTextureIdentifier(k.scale));
            }
        }

        if(_local_3)
        {
            this._Str_5545 = _local_3;

            return _local_3.bitmap;
        }

        return null;
    }

    private _Str_23649(k: IRoomGeometry): PlaneDrawingData
    {
        if(!this._Str_4542) return null;

        const _local_5 = new PlaneDrawingData();

        const index = 0;

        while(index < this._Str_4047.length)
        {
            const mask = this._Str_4047[index];

            if(mask)
            {
                const planeMask = this._Str_4795._Str_8361(mask.type);

                if(planeMask)
                {
                    const assetName = planeMask._Str_2125(k.scale);

                    if(assetName)
                    {
                        const position  = k.getCoordinatePosition(this._normal);
                        const asset     = planeMask._Str_21021(k.scale, position);

                        if(asset)
                        {
                            const _local_3  = (this._Str_2730.width * (1 - (mask._Str_5120 / this._Str_2920.length)));
                            const _local_4  = (this._Str_2730.height * (1 - (mask._Str_4659 / this._Str_2943.length)));
                            const _local_11 = new Point((_local_3 + asset.offsetX), (_local_4 + asset.offsetY));

                            _local_5.addMask(assetName, _local_11, asset.flipH, asset.flipV);
                        }
                    }
                }
            }
        }

        return _local_5;
    }

    private _Str_24802(k: IRoomGeometry): number
    {
        const _local_2 = k.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_3 = k.getScreenPoint(new Vector3d(0, 1, 0));

        return Math.round((this._Str_2920.length * Math.abs((_local_2.x - _local_3.x))));
    }

    public _Str_22136(geometry:IRoomGeometry): PlaneDrawingData[]
    {
        const drawingDatas: PlaneDrawingData[] = [];

        if(this._Str_3816)
        {
            const maskData  = this._Str_23649(geometry);
            const layers    = this._rasterizer._Str_8988(this._Str_576);

            let i = 0;

            while(i < layers.length)
            {
                const layer = (layers[i] as PlaneVisualizationLayer);

                if(layer)
                {
                    if(this._Str_13946 && layer._Str_8547())
                    {
                        const normal    = geometry.getCoordinatePosition(this._normal);
                        const cm        = layer._Str_8547()._Str_21968(normal);
                        //const data      = new PlaneDrawingData(maskData, blend(this._color, layer._Str_751()), cm._Str_14945());
                        const data      = new PlaneDrawingData(maskData, this._color, cm._Str_14945());

                        Randomizer._Str_17384(this._Str_16308);

                        for(const column of cm._Str_23721(this._Str_24802(geometry)))
                        {
                            const assetNames: string[] = [];

                            for(const cell of column._Str_22299())
                            {
                                const name = cell._Str_2125(normal);

                                if(name) assetNames.push(name);
                            }

                            if(assetNames.length > 0)
                            {
                                if(!column._Str_24523()) assetNames.push('');

                                data._Str_22862(assetNames);
                            }
                        }

                        if(data._Str_17636.length > 0) drawingDatas.push(data);
                    }
                    else
                    {
                        //data = new PlaneDrawingData(maskData, blend(this._color, layer._Str_751()));
                        const data = new PlaneDrawingData(maskData, this._color);

                        drawingDatas.push(data);
                    }
                }

                i++;
            }

            if(!drawingDatas.length) drawingDatas.push(new PlaneDrawingData(maskData, this._color));
        }

        return drawingDatas;
    }

    // private _Str_25956(k:PlaneBitmapData): void
    // {
    // }

    public update(geometry: IRoomGeometry, timeSinceStartMs: number): boolean
    {
        if(!geometry || this._disposed) return false;

        let geometryChanged = false;

        if(this._Str_3406 != geometry.updateId) geometryChanged = true;

        if(!geometryChanged || !this._Str_7367)
        {
            if(!this.visible) return false;
        }

        if(geometryChanged)
        {
            this._Str_5545 = null;

            let cosAngle = 0;

            cosAngle = Vector3d.cosAngle(geometry.directionAxis, this.normal);

            if(cosAngle > -0.001)
            {
                if(this._Str_3816)
                {
                    this._Str_3816 = false;
                    return true;
                }

                return false;
            }

            let i = 0;

            while(i < this._Str_5886.length)
            {
                cosAngle = Vector3d.cosAngle(geometry.directionAxis, this._Str_5886[i]);

                if(cosAngle > -0.001)
                {
                    if(this._Str_3816)
                    {
                        this._Str_3816 = false;
                        return true;
                    }

                    return false;
                }

                i++;
            }

            this._Str_18702(geometry);

            const originPos = geometry.getScreenPosition(this._Str_5221);
            const originZ = originPos.z;

            let relativeDepth = (Math.max(this._Str_2820.z, this._Str_2745.z, this._Str_2639.z, this._Str_2766.z) - originZ);

            if(this._type === RoomPlane.TYPE_FLOOR)
            {
                relativeDepth = (relativeDepth - ((this._location.z + Math.min(0, this._Str_2920.z, this._Str_2943.z)) * 8));
            }

            if(this._type === RoomPlane.TYPE_LANDSCAPE)
            {
                relativeDepth = (relativeDepth + 0.02);
            }

            this._relativeDepth = relativeDepth;
            this._Str_3816      = true;
            this._Str_3406      = geometry.updateId;
        }

        if(geometryChanged || this._Str_10518(geometry, timeSinceStartMs))
        {
            if(!this._Str_1049 || (this._Str_1720 !== this._Str_1049.width) || (this._height !== this._Str_1049.height))
            {
                if(this._Str_1049)
                {
                    this._Str_1049.destroy();

                    this._Str_1049 = null;

                    if((this._Str_1720 < 1) || (this._height < 1)) return true;
                }
                else
                {
                    if((this._Str_1720 < 1) || (this._height < 1)) return false;
                }

                const graphic = new Graphics();

                graphic.beginFill(0xFFFFFF, 0);
                graphic.drawRect(0, 0, this._Str_1720, this._height);
                graphic.endFill();

                this._Str_1049 = graphic;

                if(!this._Str_1049) return false;
            }
            else
            {
                //this._Str_1049.lock();
                //this._Str_1049.fillRect(this._Str_1049.rect, 0xFFFFFF);
            }

            Randomizer._Str_17384(this._Str_16308);

            const texture = this._Str_10114(geometry, timeSinceStartMs);

            if(texture)
            {
                this._Str_17000(geometry, texture);
            }
            else
            {
                this.dispose();

                return false;
            }

            return ((texture !== null) || geometryChanged);
        }

        return false;
    }

    private _Str_18702(k: IRoomGeometry): void
    {
        this._Str_2820.assign(k.getScreenPosition(this._location));
        this._Str_2745.assign(k.getScreenPosition(Vector3d.sum(this._location, this._Str_2943)));
        this._Str_2639.assign(k.getScreenPosition(Vector3d.sum(Vector3d.sum(this._location, this._Str_2920), this._Str_2943)));
        this._Str_2766.assign(k.getScreenPosition(Vector3d.sum(this._location, this._Str_2920)));
        this._offset = k.getScreenPoint(this._Str_5221);
        this._Str_2820.x = Math.round(this._Str_2820.x);
        this._Str_2820.y = Math.round(this._Str_2820.y);
        this._Str_2745.x = Math.round(this._Str_2745.x);
        this._Str_2745.y = Math.round(this._Str_2745.y);
        this._Str_2639.x = Math.round(this._Str_2639.x);
        this._Str_2639.y = Math.round(this._Str_2639.y);
        this._Str_2766.x = Math.round(this._Str_2766.x);
        this._Str_2766.y = Math.round(this._Str_2766.y);
        this._offset.x = Math.round(this._offset.x);
        this._offset.y = Math.round(this._offset.y);
        const _local_2: number = Math.min(this._Str_2820.x, this._Str_2745.x, this._Str_2639.x, this._Str_2766.x);
        let _local_3: number = Math.max(this._Str_2820.x, this._Str_2745.x, this._Str_2639.x, this._Str_2766.x);
        const _local_4: number = Math.min(this._Str_2820.y, this._Str_2745.y, this._Str_2639.y, this._Str_2766.y);
        let _local_5: number = Math.max(this._Str_2820.y, this._Str_2745.y, this._Str_2639.y, this._Str_2766.y);
        _local_3 = (_local_3 - _local_2);
        this._offset.x = (this._offset.x - _local_2);
        this._Str_2820.x = (this._Str_2820.x - _local_2);
        this._Str_2745.x = (this._Str_2745.x - _local_2);
        this._Str_2639.x = (this._Str_2639.x - _local_2);
        this._Str_2766.x = (this._Str_2766.x - _local_2);
        _local_5 = (_local_5 - _local_4);
        this._offset.y = (this._offset.y - _local_4);
        this._Str_2820.y = (this._Str_2820.y - _local_4);
        this._Str_2745.y = (this._Str_2745.y - _local_4);
        this._Str_2639.y = (this._Str_2639.y - _local_4);
        this._Str_2766.y = (this._Str_2766.y - _local_4);
        this._Str_1720 = _local_3;
        this._height = _local_5;
    }

    private _Str_17000(k: IRoomGeometry, _arg_2: Graphics): void
    {
        if(((((((this._Str_2820 == null) || (this._Str_2745 == null)) || (this._Str_2639 == null)) || (this._Str_2766 == null)) || (_arg_2 == null)) || (this._Str_1049 == null)))
        {
            return;
        }
        let _local_3: number = (this._Str_2766.x - this._Str_2639.x);
        let _local_4: number = (this._Str_2766.y - this._Str_2639.y);
        let _local_5: number = (this._Str_2745.x - this._Str_2639.x);
        let _local_6: number = (this._Str_2745.y - this._Str_2639.y);
        if(((this._type == RoomPlane.TYPE_WALL) || (this._type == RoomPlane.TYPE_LANDSCAPE)))
        {
            if(Math.abs((_local_5 - _arg_2.width)) <= 1)
            {
                _local_5 = _arg_2.width;
            }
            if(Math.abs((_local_6 - _arg_2.width)) <= 1)
            {
                _local_6 = _arg_2.width;
            }
            if(Math.abs((_local_3 - _arg_2.height)) <= 1)
            {
                _local_3 = _arg_2.height;
            }
            if(Math.abs((_local_4 - _arg_2.height)) <= 1)
            {
                _local_4 = _arg_2.height;
            }
        }
        const _local_7: number = (_local_5 / _arg_2.width);
        const _local_8: number = (_local_6 / _arg_2.width);
        const _local_9: number = (_local_3 / _arg_2.height);
        const _local_10: number = (_local_4 / _arg_2.height);
        const _local_11 = new Matrix();
        _local_11.a = _local_7;
        _local_11.b = _local_8;
        _local_11.c = _local_9;
        _local_11.d = _local_10;
        _local_11.translate(this._Str_2639.x, this._Str_2639.y);

        this.draw(_arg_2, _local_11);
    }

    private draw(k: Graphics, matrix: Matrix): void
    {
        const clone = k.clone();

        clone.transform.setFromMatrix(matrix);

        this._Str_1049 = clone;
    }

    public _Str_25213(): void
    {
        if(this._disposed || !this._Str_4542 || !this._Str_4047.length) return;

        this._Str_4891 = true;
        this._Str_4047 = [];
    }

    public _Str_24569(k: string, _arg_2: number, _arg_3: number): boolean
    {
        if(!this._Str_4542) return false;

        let _local_5 = 0;

        while(_local_5 < this._Str_4047.length)
        {
            const mask = this._Str_4047[_local_5];

            if(mask)
            {
                if((((mask.type === k) && (mask._Str_5120 === _arg_2)) && (mask._Str_4659 === _arg_3))) return false;
            }

            _local_5++;
        }

        const mask = new RoomPlaneBitmapMask(k, _arg_2, _arg_3);

        this._Str_4047.push(mask);
        this._Str_4891 = true;

        return true;
    }

    public _Str_25934(): void
    {
        if(!this._Str_4542 || !this._Str_5088.length) return;

        this._Str_4891 = true;
        this._Str_5088 = [];
    }

    public _Str_24758(k: number, _arg_2: number, _arg_3: number, _arg_4: number): boolean
    {
        if(this._Str_4542)
        {
            for(const mask of this._Str_5088)
            {
                if(!mask) continue;

                if((((mask._Str_5120 === k) && (mask._Str_4659 === _arg_2)) && (mask._Str_9124 === _arg_3)) && (mask._Str_12156 === _arg_4)) return false;
            }

            const _local_5 = new RoomPlaneRectangleMask(k, _arg_2, _arg_3, _arg_4);

            this._Str_5088.push(_local_5);
            this._Str_4891 = true;

            return true;
        }

        return false;
    }

    private _Str_19336(): void
    {
        if(!this._Str_4891) return;

        let _local_3 = true;
        let _local_6: boolean;

        if(this._Str_4047.length === this._Str_8341.length)
        {
            for(const mask of this._Str_4047)
            {
                if(!mask) continue;

                _local_6 = false;

                for(const plane of this._Str_8341)
                {
                    if(!plane) continue;

                    if(((plane.type === mask.type) && (plane._Str_5120 === mask._Str_5120)) && (plane._Str_4659 === mask._Str_4659))
                    {
                        _local_6 = true;

                        break;
                    }
                }

                if(!_local_6)
                {
                    _local_3 = false;

                    break;
                }
            }
        }
        else
        {
            _local_3 = false;
        }

        if(this._Str_5088.length > this._Str_14495.length) _local_3 = false;

        if(_local_3) this._Str_4891 = false;
    }

    private _Str_17859(texture: Graphics, geometry: IRoomGeometry): void
    {
        if(!texture || !geometry) return;

        if(((!this._Str_4542) || ((!this._Str_4047.length && !this._Str_5088.length) && !this._Str_4891)) || !this._Str_4795) return;

        const width   = texture.width;
        const height  = texture.height;

        this._Str_19336();

        if(!this._Str_2730 || (this._Str_2730.width !== width) || (this._Str_2730.height !== height))
        {
            if(this._Str_2730)
            {
                this._Str_2730.destroy();
                this._Str_2730 = null;
            }

            const graphic = new Graphics();

            graphic
                .beginFill(0xFFFFFF, 0)
                .drawRect(0, 0, width, height)
                .endFill();

            this._Str_2730 = graphic;
            this._Str_4891 = true;
        }

        if(this._Str_4891)
        {
            this._Str_8341  = [];
            this._Str_14495 = [];

            if(this._Str_2730)
            {
                this._Str_2730
                    .beginFill(0xFFFFFF, 0)
                    .drawRect(0, 0, width, height)
                    .endFill();
            }

            this._Str_11000(texture);

            const normal = geometry.getCoordinatePosition(this._normal);

            let type: string    = null;
            let posX            = 0;
            let posY            = 0;
            let i               = 0;

            while(i < this._Str_4047.length)
            {
                const mask = this._Str_4047[i];

                if(mask)
                {
                    type = mask.type;
                    posX = (this._Str_2730.width - ((this._Str_2730.width * mask._Str_5120) / this._Str_2920.length));
                    posY = (this._Str_2730.height - ((this._Str_2730.height * mask._Str_4659) / this._Str_2943.length));

                    this._Str_4795._Str_17859(this._Str_2730, type, geometry.scale, normal, posX, posY);
                    this._Str_8341.push(new RoomPlaneBitmapMask(type, mask._Str_5120, mask._Str_4659));
                }

                i++;
            }

            i = 0;

            while(i < this._Str_5088.length)
            {
                const rectMask = this._Str_5088[i];

                if(rectMask)
                {
                    posX    = (this._Str_2730.width - ((this._Str_2730.width * rectMask._Str_5120) / this._Str_2920.length));
                    posY    = (this._Str_2730.height - ((this._Str_2730.height * rectMask._Str_4659) / this._Str_2943.length));

                    const wd  = ((this._Str_2730.width * rectMask._Str_9124) / this._Str_2920.length);
                    const ht  = ((this._Str_2730.height * rectMask._Str_12156) / this._Str_2943.length);

                    this._Str_2730
                        .beginFill(0xFF0000)
                        .drawRect((posX - wd), (posY - ht), wd, ht)
                        .endFill();

                    this._Str_14495.push(new RoomPlaneRectangleMask(rectMask._Str_9124, rectMask._Str_4659, rectMask._Str_9124, rectMask._Str_12156));
                }

                i++;
            }

            this._Str_4891 = false;
        }

        this._Str_24790(texture, this._Str_2730);
    }

    private _Str_24790(texture: Graphics, mask: Graphics): void
    {
        if(!texture || !mask) return;

        const maskCanvas    = Nitro.instance.renderer.extract.canvas(mask);
        const textureCanvas = Nitro.instance.renderer.extract.canvas(texture);
        const textureCtx    = textureCanvas.getContext('2d');

        textureCtx.drawImage(maskCanvas, 0, 0);

        const textureImageData  = textureCtx.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
        const data              = textureImageData.data;

        for(let i = 0; i < data.length; i += 4)
        {
            const red   = data[ i ];
            const green = data[ i + 1 ];
            const blue  = data[ i + 2 ];
            const alpha = data[ i + 3 ];

            if(!red && !green && !blue) data[ i + 3 ] = 0;
        }

        textureCtx.putImageData(textureImageData, 0, 0);

        const newTexture = Texture.from(textureCanvas);

        if(!newTexture) return;

        texture
            .clear()
            .beginTextureFill({ texture: newTexture })
            .drawRect(0, 0, newTexture.width, newTexture.height)
            .endFill();
    }
}
