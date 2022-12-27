import { MIPMAP_MODES, SCALE_MODES } from '@pixi/constants';
import { Renderer, RenderTexture, Resource, Texture } from '@pixi/core';
import { Matrix, Point } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { IRoomGeometry, IRoomPlane, IVector3D, Vector3d } from '../../../../../api';
import { PixiApplicationProxy, TextureUtils } from '../../../../../pixi-proxy';
import { ColorConverter } from '../../../../../room';
import { PlaneMaskManager } from './mask';
import { PlaneDrawingData } from './PlaneDrawingData';
import { IPlaneRasterizer } from './rasterizer';
import { RoomPlaneBitmapMask } from './RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from './RoomPlaneRectangleMask';
import { PlaneBitmapData, Randomizer } from './utils';

export class RoomPlane implements IRoomPlane
{
    private static ZERO_POINT: Point = new Point(0, 0);
    public static TYPE_UNDEFINED: number = 0;
    public static TYPE_WALL: number = 1;
    public static TYPE_FLOOR: number = 2;
    public static TYPE_LANDSCAPE: number = 3;
    private static _uniqueIdCounter: number = 1;

    private _disposed: boolean;
    private _randomSeed: number;
    private _origin: Vector3d;
    private _location: Vector3d;
    private _leftSide: Vector3d;
    private _rightSide: Vector3d;
    private _normal: Vector3d;
    private _secondaryNormals: Vector3d[];
    private _geometryUpdateId: number;
    private _type: number;
    private _isVisible: boolean;
    private _bitmapData: RenderTexture;
    private _hasTexture: boolean;
    private _offset: Point;
    private _relativeDepth: number;
    private _color: number;
    private _rasterizer: IPlaneRasterizer;
    private _maskManager: PlaneMaskManager = null;
    private _id: string;
    private _uniqueId: number;
    private _textureOffsetX: number;
    private _textureOffsetY: number;
    private _textureMaxX: number;
    private _textureMaxY: number;
    private _textures: Map<string, PlaneBitmapData>;
    private _activeTexture: PlaneBitmapData;
    private _useMask: boolean;
    private _bitmapMasks: RoomPlaneBitmapMask[];
    private _rectangleMasks: RoomPlaneRectangleMask[];
    private _maskChanged: boolean;
    private _maskBitmapData: RenderTexture;
    private _bitmapMasksOld: RoomPlaneBitmapMask[];
    private _rectangleMasksOld: RoomPlaneRectangleMask[];
    private _cornerA: Vector3d;
    private _cornerB: Vector3d;
    private _cornerC: Vector3d;
    private _cornerD: Vector3d;
    private _width: number = 0;
    private _height: number = 0;
    private _canBeVisible: boolean;

    constructor(origin: IVector3D, location: IVector3D, leftSide: IVector3D, rightSide: IVector3D, type: number, usesMask: boolean, secondaryNormals: IVector3D[], randomSeed: number, textureOffsetX: number = 0, textureOffsetY: number = 0, textureMaxX: number = 0, textureMaxY: number = 0)
    {
        this._secondaryNormals = [];
        this._bitmapMasks = [];
        this._rectangleMasks = [];
        this._bitmapMasksOld = [];
        this._rectangleMasksOld = [];
        this._randomSeed = randomSeed;
        this._bitmapData = null;
        this._maskBitmapData = null;
        this._maskChanged = false;
        this._activeTexture = null;
        this._origin = new Vector3d();
        this._origin.assign(origin);
        this._location = new Vector3d();
        this._location.assign(location);
        this._leftSide = new Vector3d();
        this._leftSide.assign(leftSide);
        this._rightSide = new Vector3d();
        this._rightSide.assign(rightSide);
        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);

        if(this._normal.length > 0)
        {
            this._normal.multiply((1 / this._normal.length));
        }

        if(secondaryNormals != null)
        {
            for(const entry of secondaryNormals)
            {
                if(!entry) continue;

                const vector = new Vector3d();

                vector.assign(entry);

                this._secondaryNormals.push(vector);
            }
        }
        this._disposed = false;
        this._isVisible = false;
        this._id = null;
        this._hasTexture = true;
        this._geometryUpdateId = -1;
        this._offset = new Point();
        this._relativeDepth = 0;
        this._type = type;
        this._color = 0;
        this._rasterizer = null;
        this._canBeVisible = true;
        this._textures = new Map();
        this._cornerA = new Vector3d();
        this._cornerB = new Vector3d();
        this._cornerC = new Vector3d();
        this._cornerD = new Vector3d();
        this._width = 0;
        this._height = 0;
        this._textureOffsetX = textureOffsetX;
        this._textureOffsetY = textureOffsetY;
        this._textureMaxX = textureMaxX;
        this._textureMaxY = textureMaxY;
        this._useMask = usesMask;
        this._uniqueId = ++RoomPlane._uniqueIdCounter;
    }

    private static blend(a: number, b: number): number
    {
        return ColorConverter.colorize(b, (a | 0xFF000000)) & 0xFFFFFF;
    }

    public set canBeVisible(k: boolean)
    {
        if(k !== this._canBeVisible)
        {
            if(!this._canBeVisible) this.resetTextureCache();

            this._canBeVisible = k;
        }
    }

    public get canBeVisible(): boolean
    {
        return this._canBeVisible;
    }

    public get bitmapData(): Texture<Resource>
    {
        if(!this.visible || !this._bitmapData) return null;

        return this._bitmapData;
    }

    public get maskBitmapData(): RenderTexture
    {
        if(!this.visible || !this._maskBitmapData) return null;

        return this._maskBitmapData;
    }

    public get visible(): boolean
    {
        return (this._isVisible && this._canBeVisible);
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

    public get leftSide(): IVector3D
    {
        return this._leftSide;
    }

    public get rightSide(): IVector3D
    {
        return this._rightSide;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get normal(): IVector3D
    {
        return this._normal;
    }

    public get hasTexture(): boolean
    {
        return this._hasTexture;
    }

    public set hasTexture(k: boolean)
    {
        this._hasTexture = k;
    }

    public set rasterizer(k: IPlaneRasterizer)
    {
        this._rasterizer = k;
    }

    public set maskManager(k: PlaneMaskManager)
    {
        this._maskManager = k;
    }

    public set id(k: string)
    {
        if(k === this._id) return;

        this.resetTextureCache();
        this._id = k;
    }

    public get uniqueId(): number
    {
        return this._uniqueId;
    }

    public dispose(): void
    {
        if(this._bitmapData)
        {
            this._bitmapData.destroy();

            this._bitmapData = null;
        }

        if(this._textures)
        {
            for(const bitmap of this._textures.values())
            {
                if(!bitmap) continue;

                if(bitmap.texture) bitmap.texture.destroy();

                bitmap.dispose();
            }

            this._textures = null;
        }

        this._activeTexture = null;
        this._location = null;
        this._origin = null;
        this._leftSide = null;
        this._rightSide = null;
        this._normal = null;
        this._rasterizer = null;
        this._cornerA = null;
        this._cornerB = null;
        this._cornerC = null;
        this._cornerD = null;
        this._bitmapMasks = null;
        this._rectangleMasks = null;

        if(this._maskBitmapData)
        {
            this._maskBitmapData.destroy();

            this._maskBitmapData = null;
        }

        this._disposed = true;
    }

    public copyBitmapData(k: Texture<Resource>): Texture<Resource>
    {
        if(!this.visible || !this._bitmapData || !k) return null;

        if((this._bitmapData.width !== k.width) || (this._bitmapData.height !== k.height)) return null;

        //k.copyPixels(this._bitmapData, this._bitmapData.rect, RoomPlane.ZERO_POINT);
        return k;
    }

    private cacheTexture(k: string, _arg_2: PlaneBitmapData): boolean
    {
        const existing = this._textures.get(k);

        if(existing)
        {
            this._textures.delete(k);

            existing.dispose();
        }

        this._activeTexture = _arg_2;
        this._textures.set(k, _arg_2);

        return true;
    }

    private resetTextureCache(k: RenderTexture = null): void
    {
        if(this._textures && this._textures.size)
        {
            for(const bitmap of this._textures.values())
            {
                if(!bitmap) continue;

                bitmap.dispose();
            }

            this._textures.clear();
        }

        this._activeTexture = null;
    }

    private getTextureIdentifier(k: number): string
    {
        if(this._rasterizer) return this._rasterizer.getTextureIdentifier(k, this.normal);

        return k.toString();
    }

    private needsNewTexture(k: IRoomGeometry, _arg_2: number): boolean
    {
        if(!k) return false;

        let planeBitmap = this._activeTexture;

        if(!planeBitmap)
        {
            planeBitmap = this._textures.get(this.getTextureIdentifier(k.scale));
        }

        this.updateMaskChangeStatus();

        if(this._canBeVisible && ((!planeBitmap || ((planeBitmap.timeStamp >= 0) && (_arg_2 > planeBitmap.timeStamp))) || this._maskChanged)) return true;

        return false;
    }

    private getTexture(geometry: IRoomGeometry, timeSinceStartMs: number): RenderTexture
    {
        if(!geometry) return null;

        let bitmapData: PlaneBitmapData = null;

        if(this.needsNewTexture(geometry, timeSinceStartMs))
        {
            const identifier = this.getTextureIdentifier(geometry.scale);
            const width = this._leftSide.length * geometry.scale;
            const height = this._rightSide.length * geometry.scale;
            const normal = geometry.getCoordinatePosition(this._normal);

            if(this._activeTexture)
            {
                bitmapData = this._activeTexture;
            }
            else
            {
                bitmapData = this._textures.get(identifier);
            }

            let texture: RenderTexture = null;

            if(bitmapData) texture = bitmapData.texture;

            if(this._rasterizer)
            {
                bitmapData = this._rasterizer.render(texture, this._id, width, height, geometry.scale, normal, this._hasTexture, this._textureOffsetX, this._textureOffsetY, this._textureMaxX, this._textureMaxY, timeSinceStartMs);

                if(bitmapData && texture && (bitmapData?.texture !== texture)) texture.destroy();
            }
            else
            {
                const renderTexture = TextureUtils.createAndFillRenderTexture(width, height);

                bitmapData = new PlaneBitmapData(renderTexture, -1);
            }

            if(bitmapData)
            {
                this.updateMask(bitmapData.texture, geometry);
                this.cacheTexture(identifier, bitmapData);
            }
        }
        else
        {
            if(this._activeTexture)
            {
                bitmapData = this._activeTexture;
            }
            else
            {
                bitmapData = this._textures.get(this.getTextureIdentifier(geometry.scale));
            }
        }

        if(bitmapData)
        {
            this._activeTexture = bitmapData;

            return bitmapData.texture;
        }

        return null;
    }

    private resolveMasks(k: IRoomGeometry): PlaneDrawingData
    {
        if(!this._useMask) return null;

        const _local_5 = new PlaneDrawingData();

        const index = 0;

        while(index < this._bitmapMasks.length)
        {
            const mask = this._bitmapMasks[index];

            if(mask)
            {
                const planeMask = this._maskManager.getMask(mask.type);

                if(planeMask)
                {
                    const assetName = planeMask.getAssetName(k.scale);

                    if(assetName)
                    {
                        const position = k.getCoordinatePosition(this._normal);
                        const asset = planeMask.getGraphicAsset(k.scale, position);

                        if(asset)
                        {
                            const _local_3 = (this._maskBitmapData.width * (1 - (mask.leftSideLoc / this._leftSide.length)));
                            const _local_4 = (this._maskBitmapData.height * (1 - (mask.rightSideLoc / this._rightSide.length)));
                            const _local_11 = new Point((_local_3 + asset.offsetX), (_local_4 + asset.offsetY));

                            _local_5.addMask(assetName, _local_11, asset.flipH, asset.flipV);
                        }
                    }
                }
            }
        }

        return _local_5;
    }

    private screenWidth(k: IRoomGeometry): number
    {
        const _local_2 = k.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_3 = k.getScreenPoint(new Vector3d(0, 1, 0));

        return Math.round((this._leftSide.length * Math.abs((_local_2.x - _local_3.x))));
    }

    public getDrawingDatas(geometry: IRoomGeometry): PlaneDrawingData[]
    {
        const drawingDatas: PlaneDrawingData[] = [];

        if(this._isVisible)
        {
            const maskData = this.resolveMasks(geometry);
            const layers = this._rasterizer.getLayers(this._id);

            for(const layer of layers)
            {
                if(this._hasTexture && layer.getMaterial())
                {
                    const normal = geometry.getCoordinatePosition(this._normal);
                    const cellMatrix = layer.getMaterial().getMaterialCellMatrix(normal);
                    const data = new PlaneDrawingData(maskData, RoomPlane.blend(this._color, layer.getColor()), cellMatrix.isBottomAligned());

                    Randomizer.setSeed(this._randomSeed);

                    for(const column of cellMatrix.getColumns(this.screenWidth(geometry)))
                    {
                        const assetNames: string[] = [];

                        for(const cell of column.getCells())
                        {
                            const name = cell.getAssetName(normal);

                            if(name) assetNames.push(name);
                        }

                        if(assetNames.length > 0)
                        {
                            if(!column.isRepeated()) assetNames.push('');

                            data.addAssetColumn(assetNames);
                        }
                    }

                    if(data.assetNameColumns.length > 0) drawingDatas.push(data);
                }
                else
                {
                    const data = new PlaneDrawingData(maskData, RoomPlane.blend(this._color, layer.getColor()));

                    drawingDatas.push(data);
                }
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

        if(this._geometryUpdateId != geometry.updateId) geometryChanged = true;

        if(!geometryChanged || !this._canBeVisible)
        {
            if(!this.visible) return false;
        }

        if(geometryChanged)
        {
            this._activeTexture = null;

            let cosAngle = 0;

            cosAngle = Vector3d.cosAngle(geometry.directionAxis, this.normal);

            if(cosAngle > -0.001)
            {
                if(this._isVisible)
                {
                    this._isVisible = false;
                    return true;
                }

                return false;
            }

            let i = 0;

            while(i < this._secondaryNormals.length)
            {
                cosAngle = Vector3d.cosAngle(geometry.directionAxis, this._secondaryNormals[i]);

                if(cosAngle > -0.001)
                {
                    if(this._isVisible)
                    {
                        this._isVisible = false;
                        return true;
                    }

                    return false;
                }

                i++;
            }

            this.updateCorners(geometry);

            const originPos = geometry.getScreenPosition(this._origin);
            const originZ = originPos.z;

            let relativeDepth = (Math.max(this._cornerA.z, this._cornerB.z, this._cornerC.z, this._cornerD.z) - originZ);

            if(this._type === RoomPlane.TYPE_FLOOR)
            {
                relativeDepth = (relativeDepth - ((this._location.z + Math.min(0, this._leftSide.z, this._rightSide.z)) * 8));
            }

            if(this._type === RoomPlane.TYPE_LANDSCAPE)
            {
                relativeDepth = (relativeDepth + 0.02);
            }

            this._relativeDepth = relativeDepth;
            this._isVisible = true;
            this._geometryUpdateId = geometry.updateId;
        }

        if(geometryChanged || this.needsNewTexture(geometry, timeSinceStartMs))
        {
            if(!this._bitmapData || (this._width !== this._bitmapData.width) || (this._height !== this._bitmapData.height))
            {
                if(this._bitmapData)
                {
                    if((this._width !== this._bitmapData.width) || (this._height !== this._bitmapData.height))
                    {
                        this._bitmapData.destroy();

                        this._bitmapData = null;

                        if((this._width < 1) || (this._height < 1)) return true;

                        this._bitmapData = TextureUtils.createAndFillRenderTexture(this._width, this._height);
                    }
                    else
                    {
                        if((this._width < 1) || (this._height < 1))
                        {
                            this._bitmapData.destroy();

                            this._bitmapData = null;

                            return true;
                        }

                        TextureUtils.clearAndFillRenderTexture(this._bitmapData);
                    }
                }
                else
                {
                    if((this._width < 1) || (this._height < 1)) return false;

                    this._bitmapData = TextureUtils.createAndFillRenderTexture(this._width, this._height);
                }

                if(!this._bitmapData) return false;
            }
            else
            {
                TextureUtils.clearRenderTexture(this._bitmapData);
            }

            Randomizer.setSeed(this._randomSeed);

            const texture = this.getTexture(geometry, timeSinceStartMs);

            if(texture)
            {
                this.renderTexture(geometry, texture);
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

    private updateCorners(k: IRoomGeometry): void
    {
        this._cornerA.assign(k.getScreenPosition(this._location));
        this._cornerB.assign(k.getScreenPosition(Vector3d.sum(this._location, this._rightSide)));
        this._cornerC.assign(k.getScreenPosition(Vector3d.sum(Vector3d.sum(this._location, this._leftSide), this._rightSide)));
        this._cornerD.assign(k.getScreenPosition(Vector3d.sum(this._location, this._leftSide)));
        this._offset = k.getScreenPoint(this._origin);
        this._cornerA.x = Math.round(this._cornerA.x);
        this._cornerA.y = Math.round(this._cornerA.y);
        this._cornerB.x = Math.round(this._cornerB.x);
        this._cornerB.y = Math.round(this._cornerB.y);
        this._cornerC.x = Math.round(this._cornerC.x);
        this._cornerC.y = Math.round(this._cornerC.y);
        this._cornerD.x = Math.round(this._cornerD.x);
        this._cornerD.y = Math.round(this._cornerD.y);
        this._offset.x = Math.round(this._offset.x);
        this._offset.y = Math.round(this._offset.y);
        const _local_2: number = Math.min(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x);
        let _local_3: number = Math.max(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x);
        const _local_4: number = Math.min(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y);
        let _local_5: number = Math.max(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y);
        _local_3 = (_local_3 - _local_2);
        this._offset.x = (this._offset.x - _local_2);
        this._cornerA.x = (this._cornerA.x - _local_2);
        this._cornerB.x = (this._cornerB.x - _local_2);
        this._cornerC.x = (this._cornerC.x - _local_2);
        this._cornerD.x = (this._cornerD.x - _local_2);
        _local_5 = (_local_5 - _local_4);
        this._offset.y = (this._offset.y - _local_4);
        this._cornerA.y = (this._cornerA.y - _local_4);
        this._cornerB.y = (this._cornerB.y - _local_4);
        this._cornerC.y = (this._cornerC.y - _local_4);
        this._cornerD.y = (this._cornerD.y - _local_4);
        this._width = _local_3;
        this._height = _local_5;
    }

    private getMatrixForTexture(texture: RenderTexture): Matrix
    {
        let _local_3: number = (this._cornerD.x - this._cornerC.x);
        let _local_4: number = (this._cornerD.y - this._cornerC.y);
        let _local_5: number = (this._cornerB.x - this._cornerC.x);
        let _local_6: number = (this._cornerB.y - this._cornerC.y);

        if((this._type === RoomPlane.TYPE_WALL) || (this._type === RoomPlane.TYPE_LANDSCAPE))
        {
            if(Math.abs((_local_5 - texture.width)) <= 1)
            {
                _local_5 = texture.width;
            }
            if(Math.abs((_local_6 - texture.width)) <= 1)
            {
                _local_6 = texture.width;
            }
            if(Math.abs((_local_3 - texture.height)) <= 1)
            {
                _local_3 = texture.height;
            }
            if(Math.abs((_local_4 - texture.height)) <= 1)
            {
                _local_4 = texture.height;
            }
        }

        const xScale: number = (_local_5 / texture.width);
        const ySkew: number = (_local_6 / texture.width);
        const xSkew: number = (_local_3 / texture.height);
        const yScale: number = (_local_4 / texture.height);

        const matrix = new Matrix(xScale, ySkew, xSkew, yScale);

        matrix.translate(this._cornerC.x, this._cornerC.y);

        return matrix;
    }

    private renderTexture(geometry: IRoomGeometry, _arg_2: RenderTexture): void
    {
        if(((((((this._cornerA == null) || (this._cornerB == null)) || (this._cornerC == null)) || (this._cornerD == null)) || (_arg_2 == null)) || (this._bitmapData == null)))
        {
            return;
        }

        this.draw(_arg_2, this.getMatrixForTexture(_arg_2));
    }

    private draw(k: RenderTexture, matrix: Matrix): void
    {
        k.baseTexture.mipmap = MIPMAP_MODES.OFF;
        k.baseTexture.scaleMode = SCALE_MODES.LINEAR;

        TextureUtils.writeToRenderTexture(new Sprite(k), this._bitmapData, true, matrix);
    }

    public resetBitmapMasks(): void
    {
        if(this._disposed || !this._useMask || !this._bitmapMasks.length) return;

        this._maskChanged = true;
        this._bitmapMasks = [];
    }

    public addBitmapMask(maskType: string, leftSideLoc: number, rightSideLoc: number): boolean
    {
        if(!this._useMask) return false;

        let _local_5 = 0;

        while(_local_5 < this._bitmapMasks.length)
        {
            const mask = this._bitmapMasks[_local_5];

            if(mask)
            {
                if((((mask.type === maskType) && (mask.leftSideLoc === leftSideLoc)) && (mask.rightSideLoc === rightSideLoc))) return false;
            }

            _local_5++;
        }

        const mask = new RoomPlaneBitmapMask(maskType, leftSideLoc, rightSideLoc);

        this._bitmapMasks.push(mask);
        this._maskChanged = true;

        return true;
    }

    public resetRectangleMasks(): void
    {
        if(!this._useMask || !this._rectangleMasks.length) return;

        this._maskChanged = true;
        this._rectangleMasks = [];
    }

    public addRectangleMask(k: number, _arg_2: number, _arg_3: number, _arg_4: number): boolean
    {
        if(this._useMask)
        {
            for(const mask of this._rectangleMasks)
            {
                if(!mask) continue;

                if((((mask.leftSideLoc === k) && (mask.rightSideLoc === _arg_2)) && (mask.leftSideLength === _arg_3)) && (mask.rightSideLength === _arg_4)) return false;
            }

            const _local_5 = new RoomPlaneRectangleMask(k, _arg_2, _arg_3, _arg_4);

            this._rectangleMasks.push(_local_5);
            this._maskChanged = true;

            return true;
        }

        return false;
    }

    private updateMaskChangeStatus(): void
    {
        if(!this._maskChanged) return;

        let _local_3 = true;
        let _local_6: boolean;

        if(this._bitmapMasks.length === this._bitmapMasksOld.length)
        {
            for(const mask of this._bitmapMasks)
            {
                if(!mask) continue;

                _local_6 = false;

                for(const plane of this._bitmapMasksOld)
                {
                    if(!plane) continue;

                    if(((plane.type === mask.type) && (plane.leftSideLoc === mask.leftSideLoc)) && (plane.rightSideLoc === mask.rightSideLoc))
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

        if(this._rectangleMasks.length > this._rectangleMasksOld.length) _local_3 = false;

        if(_local_3) this._maskChanged = false;
    }

    private updateMask(canvas: RenderTexture, geometry: IRoomGeometry): void
    {
        if(!canvas || !geometry) return;

        if(((!this._useMask) || ((!this._bitmapMasks.length && !this._rectangleMasks.length) && !this._maskChanged)) || !this._maskManager) return;

        const width = canvas.width;
        const height = canvas.height;

        this.updateMaskChangeStatus();

        if(!this._maskBitmapData || (this._maskBitmapData.width !== width) || (this._maskBitmapData.height !== height))
        {
            if(this._maskBitmapData)
            {
                this._maskBitmapData.destroy();
                this._maskBitmapData = null;
            }

            this._maskBitmapData = TextureUtils.createAndFillRenderTexture(width, height);
            this._maskChanged = true;
        }

        if(this._maskChanged)
        {
            this._bitmapMasksOld = [];
            this._rectangleMasksOld = [];

            if(this._maskBitmapData) TextureUtils.clearAndFillRenderTexture(this._maskBitmapData);

            this.resetTextureCache(canvas);

            const normal = geometry.getCoordinatePosition(this._normal);

            let type: string = null;
            let posX = 0;
            let posY = 0;
            let i = 0;

            while(i < this._bitmapMasks.length)
            {
                const mask = this._bitmapMasks[i];

                if(mask)
                {
                    type = mask.type;
                    posX = (this._maskBitmapData.width - ((this._maskBitmapData.width * mask.leftSideLoc) / this._leftSide.length));
                    posY = (this._maskBitmapData.height - ((this._maskBitmapData.height * mask.rightSideLoc) / this._rightSide.length));

                    this._maskManager.updateMask(this._maskBitmapData, type, geometry.scale, normal, posX, posY);
                    this._bitmapMasksOld.push(new RoomPlaneBitmapMask(type, mask.leftSideLoc, mask.rightSideLoc));
                }

                i++;
            }

            i = 0;

            while(i < this._rectangleMasks.length)
            {
                const rectMask = this._rectangleMasks[i];

                if(rectMask)
                {
                    posX = (this._maskBitmapData.width - ((this._maskBitmapData.width * rectMask.leftSideLoc) / this._leftSide.length));
                    posY = (this._maskBitmapData.height - ((this._maskBitmapData.height * rectMask.rightSideLoc) / this._rightSide.length));

                    const wd = ((this._maskBitmapData.width * rectMask.leftSideLength) / this._leftSide.length);
                    const ht = ((this._maskBitmapData.height * rectMask.rightSideLength) / this._rightSide.length);

                    /* this._maskBitmapData
                        .beginFill(0xFF0000)
                        .drawRect((posX - wd), (posY - ht), wd, ht)
                        .endFill(); */

                    this._rectangleMasksOld.push(new RoomPlaneRectangleMask(rectMask.leftSideLength, rectMask.rightSideLoc, rectMask.leftSideLength, rectMask.rightSideLength));
                }

                i++;
            }

            this._maskChanged = false;
        }

        this.combineTextureMask(canvas, this._maskBitmapData);
    }

    private combineTextureMask(canvas: RenderTexture, mask: RenderTexture): void
    {
        if(!canvas || !mask) return;

        const canvasPixels = TextureUtils.getPixels(canvas);
        const maskPixels = TextureUtils.getPixels(mask);

        for(let i = 0; i < canvasPixels.length; i += 4)
        {
            const maskRed = maskPixels[i];
            const maskGreen = maskPixels[i + 1];
            const maskBlue = maskPixels[i + 2];
            const maskAlpha = maskPixels[i + 3];

            if(!maskRed && !maskGreen && !maskBlue) canvasPixels[i + 3] = 0;
        }

        const canvaGLTexture = canvas.baseTexture._glTextures['1']?.texture;
        const gl = (PixiApplicationProxy.instance.renderer as Renderer)?.gl;

        if(!canvaGLTexture || !gl) return;

        gl.bindTexture(gl.TEXTURE_2D, canvaGLTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvasPixels);
    }
}
