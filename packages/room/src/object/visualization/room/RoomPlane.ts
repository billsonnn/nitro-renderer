import { IAssetPlaneVisualizationLayer, IAssetRoomVisualizationData, IRoomGeometry, IRoomPlane, IVector3D } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { GetRenderer, PlaneMaskFilter, TextureUtils, Vector3d } from '@nitrots/utils';
import { Container, Matrix, Point, Sprite, Texture, TilingSprite } from 'pixi.js';
import { RoomGeometry } from '../../../utils';
import { RoomPlaneBitmapMask } from './RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from './RoomPlaneRectangleMask';
import { PlaneMaskManager } from './mask';
import { Randomizer } from './utils';

export class RoomPlane implements IRoomPlane
{
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;
    public static PLANE_GEOMETRY: IRoomGeometry = new RoomGeometry(64, new Vector3d(RoomPlane.HORIZONTAL_ANGLE_DEFAULT, RoomPlane.VERTICAL_ANGLE_DEFAULT), new Vector3d(-10, 0, 0));

    public static TYPE_UNDEFINED: number = 0;
    public static TYPE_WALL: number = 1;
    public static TYPE_FLOOR: number = 2;
    public static TYPE_LANDSCAPE: number = 3;
    private static _uniqueIdCounter: number = 1;

    private _disposed: boolean = false;
    private _randomSeed: number;
    private _origin: IVector3D = new Vector3d();
    private _location: IVector3D = new Vector3d();
    private _leftSide: IVector3D = new Vector3d();
    private _rightSide: IVector3D = new Vector3d();
    private _normal: IVector3D = null;
    private _secondaryNormals: IVector3D[] = [];
    private _type: number;
    private _isVisible: boolean = false;
    private _offset: Point = new Point();
    private _relativeDepth: number = 0;
    private _color: number = 0;
    private _maskManager: PlaneMaskManager = null;
    private _id: string = null;
    private _uniqueId: number;
    private _cornerA: IVector3D = new Vector3d();
    private _cornerB: IVector3D = new Vector3d();
    private _cornerC: IVector3D = new Vector3d();
    private _cornerD: IVector3D = new Vector3d();
    private _textureOffsetX: number;
    private _textureOffsetY: number;
    private _textureMaxX: number;
    private _textureMaxY: number;
    private _width: number = 0;
    private _height: number = 0;
    private _hasTexture: boolean = true;
    private _canBeVisible: boolean = true;
    private _geometryUpdateId: number = -1;

    private _useMask: boolean;
    private _bitmapMasks: RoomPlaneBitmapMask[] = [];
    private _rectangleMasks: RoomPlaneRectangleMask[] = [];
    private _maskChanged: boolean = false;
    private _bitmapMasksOld: RoomPlaneBitmapMask[] = [];
    private _rectangleMasksOld: RoomPlaneRectangleMask[] = [];

    private _planeSprite: TilingSprite = null;
    private _planeTexture: Texture = null;

    constructor(origin: IVector3D, location: IVector3D, leftSide: IVector3D, rightSide: IVector3D, type: number, usesMask: boolean, secondaryNormals: IVector3D[], randomSeed: number, textureOffsetX: number = 0, textureOffsetY: number = 0, textureMaxX: number = 0, textureMaxY: number = 0)
    {
        this._randomSeed = randomSeed;
        this._origin.assign(origin);
        this._location.assign(location);
        this._leftSide.assign(leftSide);
        this._rightSide.assign(rightSide);
        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);

        if(this._normal.length > 0) this._normal.multiply((1 / this._normal.length));

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

        this._type = type;
        this._textureOffsetX = textureOffsetX;
        this._textureOffsetY = textureOffsetY;
        this._textureMaxX = textureMaxX;
        this._textureMaxY = textureMaxY;
        this._useMask = usesMask;
        this._uniqueId = ++RoomPlane._uniqueIdCounter;
    }

    public dispose(): void
    {
        this._location = null;
        this._origin = null;
        this._leftSide = null;
        this._rightSide = null;
        this._normal = null;
        this._cornerA = null;
        this._cornerB = null;
        this._cornerC = null;
        this._cornerD = null;

        this._disposed = true;
    }

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

            let relativeDepth = (Math.max(this._cornerA.z, this._cornerB.z, this._cornerC.z, this._cornerD.z) - geometry.getScreenPosition(this._origin).z);

            switch(this._type)
            {
                case RoomPlane.TYPE_FLOOR:
                    relativeDepth = (relativeDepth - ((this._location.z + Math.min(0, this._leftSide.z, this._rightSide.z)) * 8));
                    break;
                case RoomPlane.TYPE_LANDSCAPE:
                    relativeDepth = (relativeDepth + 0.02);
                    break;
            }

            this._relativeDepth = relativeDepth;
            this._isVisible = true;
            this._geometryUpdateId = geometry.updateId;
        }

        if(geometryChanged)
        {
            Randomizer.setSeed(this._randomSeed);

            let width = (this._leftSide.length * RoomPlane.PLANE_GEOMETRY.scale);
            let height = (this._rightSide.length * RoomPlane.PLANE_GEOMETRY.scale);
            const normal = RoomPlane.PLANE_GEOMETRY.getCoordinatePosition(this._normal);

            const getTextureAndColorForPlane = (planeId: string, planeType: number) =>
            {
                const dataType: keyof IAssetRoomVisualizationData = (planeType === RoomPlane.TYPE_FLOOR) ? 'floorData' : (planeType === RoomPlane.TYPE_WALL) ? 'wallData' : 'landscapeData';

                const roomCollection = GetAssetManager().getCollection('room');
                const planeVisualizationData = roomCollection?.data?.roomVisualization?.[dataType];
                const planeVisualization = planeVisualizationData?.planes?.find(plane => (plane.id === planeId))?.visualizations?.[0];
                const planeLayer = planeVisualization?.allLayers?.[0] as IAssetPlaneVisualizationLayer;
                const planeMaterialId = planeLayer?.materialId;
                const planeColor = planeLayer?.color;
                const planeAssetName = planeVisualizationData?.textures?.find(texture => (texture.id === planeMaterialId))?.bitmaps?.[0]?.assetName;
                const texture = GetAssetManager().getAsset(planeAssetName)?.texture;

                const getRandomColor = () =>
                {
                    const letters = '0123456789ABCDEF';
                    let color = '0x';
                    for(let i = 0; i < 6; i++)
                    {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return parseInt(color, 16);
                };

                return { texture, color: planeColor };
            };

            const planeData = getTextureAndColorForPlane(this._id, this._type);
            const texture = this._hasTexture ? planeData.texture ?? Texture.WHITE : Texture.WHITE;

            switch(this._type)
            {
                case RoomPlane.TYPE_FLOOR: {
                    const _local_10 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 0, 0));
                    const _local_11 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, (height / RoomPlane.PLANE_GEOMETRY.scale), 0));
                    const _local_12 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d((width / RoomPlane.PLANE_GEOMETRY.scale), 0, 0));

                    let x = 0;
                    let y = 0;

                    if(_local_10 && _local_11 && _local_12)
                    {
                        width = Math.round(Math.abs((_local_10.x - _local_12.x)));
                        height = Math.round(Math.abs((_local_10.x - _local_11.x)));

                        const _local_15 = (_local_10.x - RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(1, 0, 0)).x);

                        x = (this._textureOffsetX * Math.trunc(Math.abs(_local_15)));
                        y = (this._textureOffsetY * Math.trunc(Math.abs(_local_15)));
                    }

                    if((x !== 0) || (y !== 0))
                    {
                        while(x < 0) x += texture.width;

                        while(y < 0) y += texture.height;
                    }

                    this._planeSprite = new TilingSprite({
                        texture,
                        width,
                        height,
                        tint: planeData.color,
                        tilePosition: {
                            x: (x % texture.width) + (this._textureOffsetX * texture.width),
                            y: (y % texture.height) + (this._textureOffsetY * texture.height)
                        }
                    });

                    break;
                }
                case RoomPlane.TYPE_WALL: {
                    const _local_8 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 0, 0));
                    const _local_9 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 0, (height / RoomPlane.PLANE_GEOMETRY.scale)));
                    const _local_10 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, (width / RoomPlane.PLANE_GEOMETRY.scale), 0));

                    if(_local_8 && _local_9 && _local_10)
                    {
                        width = Math.round(Math.abs((_local_8.x - _local_10.x)));
                        height = Math.round(Math.abs((_local_8.y - _local_9.y)));
                    }

                    this._planeSprite = new TilingSprite({
                        texture,
                        width,
                        height,
                        tint: planeData.color,
                        tilePosition: {
                            x: (this._textureOffsetX * texture.width),
                            y: (this._textureOffsetY * texture.height)
                        }
                    });

                    break;
                }
                case RoomPlane.TYPE_LANDSCAPE: {
                    const _local_13 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 0, 0));
                    const _local_14 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 0, 1));
                    const _local_15 = RoomPlane.PLANE_GEOMETRY.getScreenPoint(new Vector3d(0, 1, 0));

                    if(_local_13 && _local_14 && _local_15)
                    {
                        width = Math.round(Math.abs((((_local_13.x - _local_15.x) * width) / RoomPlane.PLANE_GEOMETRY.scale)));
                        height = Math.round(Math.abs((((_local_13.y - _local_14.y) * height) / RoomPlane.PLANE_GEOMETRY.scale)));
                    }

                    const renderMaxX = Math.trunc(this._textureMaxX * Math.abs((_local_13.x - _local_15.x)));
                    const renderMaxY = Math.trunc(this._textureMaxY * Math.abs((_local_13.y - _local_14.y)));

                    const renderOffsetX = Math.trunc(this._textureOffsetX * Math.abs((_local_13.x - _local_15.x)));
                    const renderOffsetY = Math.trunc(this._textureOffsetY * Math.abs((_local_13.y - _local_14.y)));

                    this._planeSprite = new TilingSprite({
                        texture,
                        width: width,
                        height: height,
                        tilePosition: {
                            x: renderOffsetX,
                            y: renderOffsetY
                        },
                        tint: planeData.color,
                        applyAnchorToTexture: true
                    });
                    break;
                }
                default: {
                    this._planeSprite = new TilingSprite({
                        texture: Texture.WHITE,
                        width: width,
                        height: height,
                        applyAnchorToTexture: true
                    });
                }
            }

            this._planeSprite.allowChildren = true;
        }

        const maskChanged = this._maskChanged;

        if(maskChanged)
        {
            this._planeSprite.removeChildren();

            this.updateMask(this._planeSprite, geometry);
        }

        if(this._planeTexture)
        {
            if(this._planeTexture.width !== this._width || this._planeTexture.height !== this._height)
            {
                this._planeTexture.destroy(true);

                this._planeTexture = null;
            }
        }

        if(!this._planeTexture) this._planeTexture = TextureUtils.createRenderTexture(this._width, this._height);

        if(geometryChanged || maskChanged)
        {
            GetRenderer().render({
                target: this._planeTexture,
                container: this._planeSprite,
                clear: true,
                transform: this.getMatrixForDimensions(this._planeSprite.width, this._planeSprite.height)
            });
        }

        return true;
    }

    private updateCorners(geometry: IRoomGeometry): void
    {
        this._cornerA.assign(geometry.getScreenPosition(this._location));
        this._cornerB.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._rightSide)));
        this._cornerC.assign(geometry.getScreenPosition(Vector3d.sum(Vector3d.sum(this._location, this._leftSide), this._rightSide)));
        this._cornerD.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._leftSide)));

        this._offset = geometry.getScreenPoint(this._origin);
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

        const minX = Math.min(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x);
        const maxX = Math.max(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x) - minX;
        const minY = Math.min(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y);
        const maxY = Math.max(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y) - minY;

        this._offset.x = (this._offset.x - minX);
        this._cornerA.x = (this._cornerA.x - minX);
        this._cornerB.x = (this._cornerB.x - minX);
        this._cornerC.x = (this._cornerC.x - minX);
        this._cornerD.x = (this._cornerD.x - minX);

        this._offset.y = (this._offset.y - minY);
        this._cornerA.y = (this._cornerA.y - minY);
        this._cornerB.y = (this._cornerB.y - minY);
        this._cornerC.y = (this._cornerC.y - minY);
        this._cornerD.y = (this._cornerD.y - minY);

        this._width = maxX;
        this._height = maxY;
    }

    private getMatrixForDimensions(width: number, height: number): Matrix
    {
        let a: number = (this._cornerD.x - this._cornerC.x);
        let b: number = (this._cornerD.y - this._cornerC.y);
        let c: number = (this._cornerB.x - this._cornerC.x);
        let d: number = (this._cornerB.y - this._cornerC.y);

        if((this._type === RoomPlane.TYPE_WALL) || (this._type === RoomPlane.TYPE_LANDSCAPE))
        {
            if(Math.abs((c - width)) <= 1) c = width;

            if(Math.abs((d - width)) <= 1) d = width;

            if(Math.abs((a - height)) <= 1) a = height;

            if(Math.abs((b - height)) <= 1) b = height;
        }

        const xScale: number = (c / width);
        const ySkew: number = (d / width);
        const xSkew: number = (a / height);
        const yScale: number = (b / height);

        const matrix = new Matrix(xScale, ySkew, xSkew, yScale);

        matrix.translate(this._cornerC.x, this._cornerC.y);

        return matrix;
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

        for(const mask of this._bitmapMasks)
        {
            if(!mask) continue;

            if((((mask.type === maskType) && (mask.leftSideLoc === leftSideLoc)) && (mask.rightSideLoc === rightSideLoc))) return false;
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

    public addRectangleMask(leftLocation: number, rightLocation: number, leftLength: number, rightLength: number): boolean
    {
        if(this._useMask)
        {
            for(const mask of this._rectangleMasks)
            {
                if(!mask) continue;

                if((((mask.leftSideLoc === leftLocation) && (mask.rightSideLoc === rightLocation)) && (mask.leftSideLength === leftLength)) && (mask.rightSideLength === rightLength)) return false;
            }

            this._rectangleMasks.push(new RoomPlaneRectangleMask(leftLocation, rightLocation, leftLength, rightLength));
            this._maskChanged = true;

            return true;
        }

        return false;
    }

    private updateMaskChangeStatus(): void
    {
        if(!this._maskChanged) return;

        let maskChanged = true;

        if(this._bitmapMasks.length === this._bitmapMasksOld.length)
        {
            for(const mask of this._bitmapMasks)
            {
                if(!mask) continue;

                let _local_6 = false;

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
                    maskChanged = false;

                    break;
                }
            }
        }
        else
        {
            maskChanged = false;
        }

        if(this._rectangleMasks.length > this._rectangleMasksOld.length) maskChanged = false;

        if(maskChanged) this._maskChanged = false;
    }

    private updateMask(container: Container, geometry: IRoomGeometry): void
    {
        if(!container || !geometry || !this._useMask || (!this._bitmapMasks.length && !this._rectangleMasks.length) || !this._maskManager) return;

        this.updateMaskChangeStatus();

        this._bitmapMasksOld = [];
        this._rectangleMasksOld = [];

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
                posX = (container.width - ((container.width * mask.leftSideLoc) / this._leftSide.length));
                posY = (container.height - ((container.height * mask.rightSideLoc) / this._rightSide.length));

                this._maskManager.addMaskToContainer(container, type, geometry.scale, normal, posX, posY);
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
                posX = (container.width - ((container.width * rectMask.leftSideLoc) / this._leftSide.length));
                posY = (container.height - ((container.height * rectMask.rightSideLoc) / this._rightSide.length));

                const wd = ((container.width * rectMask.leftSideLength) / this._leftSide.length);
                const ht = ((container.height * rectMask.rightSideLength) / this._rightSide.length);

                const maskSprite = new Sprite(Texture.WHITE);

                maskSprite.tint = 0x000000;
                maskSprite.width = wd;
                maskSprite.height = ht;
                maskSprite.position.set((posX - wd), (posY - ht));

                container.addChild(maskSprite);

                this._rectangleMasksOld.push(new RoomPlaneRectangleMask(rectMask.leftSideLength, rectMask.rightSideLoc, rectMask.leftSideLength, rectMask.rightSideLength));
            }

            i++;
        }

        this._maskChanged = false;

        container.filterArea = container.getBounds().rectangle;

        container.filters = [ new PlaneMaskFilter({}) ];
    }

    public get canBeVisible(): boolean
    {
        return this._canBeVisible;
    }

    public set canBeVisible(flag: boolean)
    {
        if(flag !== this._canBeVisible) this._canBeVisible = flag;
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

    public set id(k: string)
    {
        if(k === this._id) return;

        this._id = k;
    }

    public set maskManager(k: PlaneMaskManager)
    {
        this._maskManager = k;
    }

    public get uniqueId(): number
    {
        return this._uniqueId;
    }

    public get planeTexture(): Texture
    {
        return this._planeTexture;
    }

    public set hasTexture(flag: boolean)
    {
        this._hasTexture = flag;
    }
}
