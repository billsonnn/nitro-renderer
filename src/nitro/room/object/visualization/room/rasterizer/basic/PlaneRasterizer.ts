import { Graphics, Point, Texture } from 'pixi.js';
import { IGraphicAsset } from '../../../../../../../room/object/visualization/utils/IGraphicAsset';
import { IGraphicAssetCollection } from '../../../../../../../room/object/visualization/utils/IGraphicAssetCollection';
import { IRoomGeometry } from '../../../../../../../room/utils/IRoomGeometry';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Rasterizer } from '../../../../../../../room/utils/Rasterizer';
import { RoomGeometry } from '../../../../../../../room/utils/RoomGeometry';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { PlaneBitmapData } from '../../utils/PlaneBitmapData';
import { IPlaneRasterizer } from '../IPlaneRasterizer';
import { FloorPlane } from './FloorPlane';
import { Plane } from './Plane';
import { PlaneMaterial } from './PlaneMaterial';
import { PlaneMaterialCell } from './PlaneMaterialCell';
import { PlaneMaterialCellColumn } from './PlaneMaterialCellColumn';
import { PlaneMaterialCellMatrix } from './PlaneMaterialCellMatrix';
import { PlaneTexture } from './PlaneTexture';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

export class PlaneRasterizer implements IPlaneRasterizer
{
    protected static DEFAULT: string = 'default';

    private _assetCollection: IGraphicAssetCollection;
    private _materials: Map<string, PlaneMaterial>;
    private _textures: Map<string, PlaneTexture>;
    private _planes: Map<string, Plane>;
    private _geometries: Map<string, RoomGeometry>;
    private _data: any;

    constructor()
    {
        this._assetCollection   = null;
        this._textures          = new Map();
        this._materials         = new Map();
        this._planes            = new Map();
        this._geometries        = new Map();
        this._data              = null;
    }

    protected get data(): any
    {
        return this._data;
    }

    protected get _Str_2697(): IGraphicAssetCollection
    {
        return this._assetCollection;
    }

    public initializeDimensions(k: number, _arg_2: number): boolean
    {
        return true;
    }

    public dispose(): void
    {
        if(this._planes)
        {
            for(const plane of this._planes.values())
            {
                if(!plane) continue;

                plane.dispose();
            }

            this._planes = null;
        }

        if(this._materials)
        {
            this._Str_21781();

            this._materials = null;
        }

        if(this._textures)
        {
            this._Str_21447();

            this._textures = null;
        }

        if(this._geometries)
        {
            for(const geometry of this._geometries.values())
            {
                if(!geometry) continue;

                geometry.dispose();
            }

            this._geometries = null;
        }

        this._data              = null;
        this._assetCollection   = null;
    }

    public _Str_3355(): void
    {
        for(const plane of this._planes.values())
        {
            if(!plane) continue;

            plane._Str_3355();
        }

        for(const material of this._materials.values())
        {
            if(!material) continue;

            material._Str_3355();
        }
    }

    public initialize(data: any): void
    {
        this._data = data;
    }

    public _Str_24005(): void
    {
        this._Str_21447();
        this._Str_21781();
        this._Str_22054();
    }

    private _Str_21781(): void
    {
        for(const material of this._materials.values())
        {
            if(!material) continue;

            material.dispose();
        }

        this._materials.clear();
    }

    private _Str_21447(): void
    {
        for(const texture of this._textures.values())
        {
            if(!texture) continue;

            texture.dispose();
        }

        this._textures.clear();
    }

    protected _Str_10114(k: string): PlaneTexture
    {
        return this._textures.get(k);
    }

    protected _Str_8547(k: string): PlaneMaterial
    {
        return this._materials.get(k);
    }

    protected _Str_3491(k: string): Plane
    {
        return this._planes.get(k);
    }

    protected _Str_3453(k: string, _arg_2: Plane): boolean
    {
        if(!_arg_2) return false;

        const existing = this._planes.get(k);

        if(!existing)
        {
            this._planes.set(k, _arg_2);

            return true;
        }

        return false;
    }

    public _Str_6703(k: IGraphicAssetCollection): void
    {
        if(!this._data) return;

        this._assetCollection = k;

        this._Str_22054();
    }

    private _Str_22054(): void
    {
        if(!this._data) return;

        this._Str_25281();

        this.initializePlanes();
    }

    private _Str_25281(): void
    {
        if(this._data.textures && this._data.textures.length) this._Str_24250(this._data.textures, this._Str_2697);

        if(this._data.materials && this._data.materials.length) this._Str_22388(this._data.materials);
    }

    protected initializePlanes(): void
    {
    }

    private _Str_24250(k: any, _arg_2: IGraphicAssetCollection): void
    {
        if(!k || !_arg_2) return;

        if(k.length)
        {
            for(const texture of k)
            {
                if(!texture) continue;

                const id = texture.id;

                if(!this._textures.get(id))
                {
                    const plane = new PlaneTexture();

                    if(texture.bitmaps && texture.bitmaps.length)
                    {
                        for(const bitmap of texture.bitmaps)
                        {
                            if(!bitmap) continue;

                            const assetName = bitmap.assetName;

                            let normalMinX = PlaneTexture._Str_3268;
                            let normalMaxX = PlaneTexture._Str_3271;
                            let normalMinY = PlaneTexture._Str_3268;
                            let normalMaxY = PlaneTexture._Str_3271;

                            if(bitmap.normalMinX !== undefined) normalMinX = bitmap.normalMinX;
                            if(bitmap.normalMaxX !== undefined) normalMaxX = bitmap.normalMaxX;
                            if(bitmap.normalMinY !== undefined) normalMinY = bitmap.normalMinY;
                            if(bitmap.normalMaxY !== undefined) normalMaxY = bitmap.normalMaxY;

                            const asset = _arg_2.getAsset(assetName);

                            if(asset)
                            {
                                const texture = asset.texture;

                                if(texture)
                                {
                                    let newTexture: Texture = texture;

                                    if(asset.flipH)
                                    {
                                        newTexture = Rasterizer._Str_16640(texture);
                                    }

                                    plane._Str_16790(newTexture, normalMinX, normalMaxX, normalMinY, normalMaxY, assetName);
                                }
                            }
                        }
                    }

                    this._textures.set(id, plane);
                }
            }
        }
    }

    private _Str_22388(k: any): void
    {
        if(!k || !k.length) return;

        for(const material of k)
        {
            if(!material) continue;

            const id            = material.id;
            const newMaterial   = new PlaneMaterial();

            if(material.matrices && material.matrices.length)
            {
                for(const matrix of material.matrices)
                {
                    if(!matrix) continue;

                    let repeatMode  = matrix.repeatMode;
                    let align       = matrix.align;
                    const normalMinX  = PlaneMaterialCellMatrix._Str_3268;
                    const normalMaxX  = PlaneMaterialCellMatrix._Str_3271;
                    const normalMinY  = PlaneMaterialCellMatrix._Str_3268;
                    const normalMaxY  = PlaneMaterialCellMatrix._Str_3271;

                    switch(repeatMode)
                    {
                        case 'borders':
                            repeatMode = PlaneMaterialCellMatrix._Str_6087;
                            break;
                        case 'center':
                            repeatMode = PlaneMaterialCellMatrix._Str_6114;
                            break;
                        case 'first':
                            repeatMode = PlaneMaterialCellMatrix._Str_6187;
                            break;
                        case 'last':
                            repeatMode = PlaneMaterialCellMatrix._Str_6063;
                            break;
                        case 'random':
                            repeatMode = PlaneMaterialCellMatrix._Str_9127;
                            break;
                        default:
                            repeatMode = PlaneMaterialCellMatrix._Str_18632;
                            break;
                    }

                    switch(align)
                    {
                        case 'top':
                            align = PlaneMaterialCellMatrix.ALIGN_TOP;
                            break;
                        case 'bottom':
                            align = PlaneMaterialCellMatrix._Str_3606;
                            break;
                        default:
                            align = PlaneMaterialCellMatrix._Str_6914;
                            break;
                    }

                    if(matrix.columns && matrix.columns.length)
                    {
                        const cellMatrix = newMaterial._Str_24503(matrix.columns.length, repeatMode, align, normalMinX, normalMaxX, normalMinY, normalMaxY);

                        let index = 0;

                        while(index < matrix.columns.length)
                        {
                            const column = matrix.columns[index];

                            if(column) this._Str_24431(column, cellMatrix, index);

                            index++;
                        }
                    }
                }
            }

            this._materials.set(id, newMaterial);
        }
    }

    private _Str_24431(k: { repeatMode: string, width: number }, _arg_2: PlaneMaterialCellMatrix, _arg_3: number): void
    {
        if(!k || !_arg_2) return;

        let repeatMode = PlaneMaterialCellColumn._Str_7916;

        const width = k.width;

        const cells = this._Str_25217(k);

        switch(k.repeatMode)
        {
            case 'borders':
                repeatMode = PlaneMaterialCellColumn._Str_6087;
                break;
            case 'center':
                repeatMode = PlaneMaterialCellColumn._Str_6114;
                break;
            case 'first':
                repeatMode = PlaneMaterialCellColumn._Str_6187;
                break;
            case 'last':
                repeatMode = PlaneMaterialCellColumn._Str_6063;
                break;
            case 'none':
                repeatMode = PlaneMaterialCellColumn._Str_9685;
                break;
            default:
                repeatMode = PlaneMaterialCellColumn._Str_7916;
                break;
        }

        _arg_2._Str_22372(_arg_3, width, cells, repeatMode);
    }

    private _Str_25217(k: any): PlaneMaterialCell[]
    {
        if(!k || !k.cells || !k.cells.length) return null;

        const cells: PlaneMaterialCell[] = [];

        let index = 0;

        while(index < k.cells.length)
        {
            const cell = k.cells[index];

            if(cell)
            {
                const textureId = cell.textureId;

                let assetNames: string[]        = null;
                let offsetPoints: Point[]  = null;
                let graphics: IGraphicAsset[]   = null;
                let limit               = 0;

                if(cell.extras && cell.extras.length)
                {
                    const extra     = cell.extras[0];
                    const types     = extra.types;
                    const offsets   = extra.offsets;

                    if(types && offsets)
                    {
                        if(types.length && offsets.length)
                        {
                            const type          = types[0];
                            const offset        = offsets[0];

                            assetNames      = this._Str_25465(type);
                            offsetPoints    = this._Str_24448(offset);
                            limit           = offsetPoints.length;

                            if(extra.limitMax) limit = extra.limitMax;
                        }
                    }
                }

                if(assetNames && assetNames.length)
                {
                    graphics = [];

                    for(const assetName of assetNames)
                    {
                        if(!assetName) continue;

                        const asset = this._assetCollection.getAsset(assetName);

                        if(!asset) continue;

                        graphics.push(asset);
                    }
                }

                const texture   = this._Str_10114(textureId);
                const newCell   = new PlaneMaterialCell(texture, graphics, offsetPoints, limit);

                cells.push(newCell);
            }

            index++;
        }

        if(!cells || !cells.length) return null;

        return cells;
    }

    private _Str_25465(k: any): string[]
    {
        const assetNames: string[] = [];

        if(k && k.types && k.types.length)
        {
            let index = 0;

            while(index < k.types.length)
            {
                const type = k.types[index];

                const assetName = type.assetName;

                if(assetName) assetNames.push(assetName);

                index++;
            }
        }

        return assetNames;
    }

    private _Str_24448(k: any): Point[]
    {
        const offsets: Point[] = [];

        if(k && k.offsets && k.offsets.length)
        {
            let index = 0;

            while(index < k.offsets.length)
            {
                const offset = k.offsets[index];

                const x = offset.x;
                const y = offset.y;

                offsets.push(new Point(x, y));

                index++;
            }
        }

        return offsets;
    }

    protected _Str_17204(k: number, _arg_2: number, _arg_3: number): IRoomGeometry
    {
        _arg_2 = Math.abs(_arg_2);
        if(_arg_2 > 90) _arg_2 = 90;

        _arg_3 = Math.abs(_arg_3);
        if(_arg_3 > 90) _arg_3 = 90;

        const identifier = `${ k }_${ Math.round(_arg_2) }_${ Math.round(_arg_3) }`;

        let geometry = this._geometries.get(identifier);

        if(geometry) return geometry;

        geometry = new RoomGeometry(k, new Vector3d(_arg_2, _arg_3), new Vector3d(-10, 0, 0));

        this._geometries.set(identifier, geometry);

        return geometry;
    }

    protected _Str_9137(k: Plane, _arg_2: any): void
    {
        if(!k || !_arg_2) return;

        if(_arg_2 && _arg_2.length)
        {
            for(const visualization of _arg_2)
            {
                if(!visualization) continue;

                const size = visualization.size;

                let horizontalAngle = FloorPlane._Str_5433;
                let verticalAngle   = FloorPlane._Str_5509;

                if(visualization.horizontalAngle) horizontalAngle   = visualization.horizontalAngle;
                if(visualization.verticalAngle) verticalAngle       = visualization.verticalAngle;

                const layers = visualization.layers;

                const planeVisualization = k._Str_20305(size, ((layers && layers.length) || 0), this._Str_17204(size, horizontalAngle, verticalAngle));

                if(planeVisualization && (layers && layers.length))
                {
                    let layerId = 0;

                    while(layerId < layers.length)
                    {
                        const layer = layers[layerId];

                        if(layer)
                        {
                            let material: PlaneMaterial     = null;
                            let align: number               = PlaneVisualizationLayer._Str_6914;
                            let color: number               = FloorPlane._Str_2531;
                            let offset: number              = PlaneVisualizationLayer._Str_1934;

                            if(layer.materialId) material = this._Str_8547(layer.materialId);

                            if(layer.color) color = layer.color;

                            if(layer.offset) offset = layer.offset;

                            if(layer.align)
                            {
                                if(layer.align === 'bottom') align = PlaneVisualizationLayer._Str_3606;

                                else if(layer.align == 'top') align = PlaneVisualizationLayer.ALIGN_TOP;
                            }

                            planeVisualization._Str_21464(layerId, material, color, align, offset);
                        }

                        layerId++;
                    }
                }
            }
        }
    }

    public render(k: Graphics, _arg_2: string, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: IVector3D, _arg_7: boolean, _arg_8: number  =0, _arg_9: number = 0, _arg_10: number = 0, _arg_11: number = 0, _arg_12: number = 0): PlaneBitmapData
    {
        return null;
    }

    public getTextureIdentifier(k: number, _arg_2: IVector3D): string
    {
        return k.toString();
    }

    public _Str_8988(k: string): PlaneVisualizationLayer[]
    {
        let planes = this._Str_3491(k);

        if(!planes) planes = this._Str_3491(PlaneRasterizer.DEFAULT);

        return planes._Str_8988();
    }
}