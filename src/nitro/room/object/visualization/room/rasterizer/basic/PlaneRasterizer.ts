import { RenderTexture, Resource, Texture } from '@pixi/core';
import { Point } from '@pixi/math';
import { IAssetPlaneMaterial, IAssetPlaneMaterialCellColumn, IAssetPlaneTexture, IAssetPlaneVisualization, IAssetPlaneVisualizationData, IAssetPlaneVisualizationLayer, IGraphicAsset, IGraphicAssetCollection, IRoomGeometry, IVector3D, Vector3d } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { Rasterizer, RoomGeometry } from '../../../../../../../room';
import { PlaneBitmapData } from '../../utils';
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
    private _data: IAssetPlaneVisualizationData;

    constructor()
    {
        this._assetCollection = null;
        this._textures = new Map();
        this._materials = new Map();
        this._planes = new Map();
        this._geometries = new Map();
        this._data = null;
    }

    protected get data(): IAssetPlaneVisualizationData
    {
        return this._data;
    }

    protected get assetCollection(): IGraphicAssetCollection
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
            this.resetMaterials();

            this._materials = null;
        }

        if(this._textures)
        {
            this.resetTextures();

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

        this._data = null;
        this._assetCollection = null;
    }

    public clearCache(): void
    {
        for(const plane of this._planes.values())
        {
            if(!plane) continue;

            plane.clearCache();
        }

        for(const material of this._materials.values())
        {
            if(!material) continue;

            material.clearCache();
        }
    }

    public initialize(data: IAssetPlaneVisualizationData): void
    {
        this._data = data;
    }

    public reinitialize(): void
    {
        this.resetTextures();
        this.resetMaterials();
        this.initializeAll();
    }

    private resetMaterials(): void
    {
        for(const material of this._materials.values())
        {
            if(!material) continue;

            material.dispose();
        }

        this._materials.clear();
    }

    private resetTextures(): void
    {
        for(const texture of this._textures.values())
        {
            if(!texture) continue;

            texture.dispose();
        }

        this._textures.clear();
    }

    protected getTexture(textureId: string): PlaneTexture
    {
        return this._textures.get(textureId);
    }

    protected getMaterial(materialId: string): PlaneMaterial
    {
        return this._materials.get(materialId);
    }

    protected getPlane(planeId: string): Plane
    {
        return this._planes.get(planeId);
    }

    protected addPlane(id: string, plane: Plane): boolean
    {
        if(!plane) return false;

        const existing = this._planes.get(id);

        if(!existing)
        {
            this._planes.set(id, plane);

            return true;
        }

        return false;
    }

    public initializeAssetCollection(collection: IGraphicAssetCollection): void
    {
        if(!this._data) return;

        this._assetCollection = collection;

        this.initializeAll();
    }

    private initializeAll(): void
    {
        if(!this._data) return;

        this.initializeTexturesAndMaterials();

        this.initializePlanes();
    }

    private initializeTexturesAndMaterials(): void
    {
        if(this._data.textures && this._data.textures.length) this.parseTextures(this._data.textures, this.assetCollection);
        if(this._data.materials && this._data.materials.length) this.parsePlaneMaterials(this._data.materials);
    }

    protected initializePlanes(): void
    {
    }

    private parseTextures(textures: IAssetPlaneTexture[], collection: IGraphicAssetCollection): void
    {
        if(!textures || !collection) return;

        if(textures.length)
        {
            for(const texture of textures)
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

                            let normalMinX = PlaneTexture.MIN_NORMAL_COORDINATE_VALUE;
                            let normalMaxX = PlaneTexture.MAX_NORMAL_COORDINATE_VALUE;
                            let normalMinY = PlaneTexture.MIN_NORMAL_COORDINATE_VALUE;
                            let normalMaxY = PlaneTexture.MAX_NORMAL_COORDINATE_VALUE;

                            if(bitmap.normalMinX !== undefined) normalMinX = bitmap.normalMinX;
                            if(bitmap.normalMaxX !== undefined) normalMaxX = bitmap.normalMaxX;
                            if(bitmap.normalMinY !== undefined) normalMinY = bitmap.normalMinY;
                            if(bitmap.normalMaxY !== undefined) normalMaxY = bitmap.normalMaxY;

                            const asset = collection.getAsset(assetName);

                            if(asset)
                            {
                                const texture = asset.texture;

                                if(texture)
                                {
                                    let newTexture: Texture<Resource> = texture;

                                    if(asset.flipH)
                                    {
                                        newTexture = Rasterizer.getFlipHBitmapData(texture);
                                    }
                                    else
                                    {
                                        newTexture = newTexture.clone();
                                    }

                                    plane.addBitmap(newTexture, normalMinX, normalMaxX, normalMinY, normalMaxY, assetName);
                                }
                            }
                        }
                    }

                    this._textures.set(id, plane);
                }
            }
        }
    }

    private parsePlaneMaterials(materials: IAssetPlaneMaterial[]): void
    {
        if(!materials || !materials.length) return;

        for(const material of materials)
        {
            if(!material) continue;

            const id = material.id;
            const newMaterial = new PlaneMaterial();

            if(material.matrices && material.matrices.length)
            {
                for(const matrix of material.matrices)
                {
                    if(!matrix) continue;

                    let repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_DEFAULT;
                    let align = PlaneMaterialCellMatrix.ALIGN_DEFAULT;

                    let normalMinX = PlaneMaterialCellMatrix.MIN_NORMAL_COORDINATE_VALUE;
                    let normalMaxX = PlaneMaterialCellMatrix.MAX_NORMAL_COORDINATE_VALUE;
                    let normalMinY = PlaneMaterialCellMatrix.MIN_NORMAL_COORDINATE_VALUE;
                    let normalMaxY = PlaneMaterialCellMatrix.MAX_NORMAL_COORDINATE_VALUE;

                    if(matrix.normalMinX !== undefined) normalMinX = matrix.normalMinX;
                    if(matrix.normalMaxX !== undefined) normalMaxX = matrix.normalMaxX;
                    if(matrix.normalMinY !== undefined) normalMinY = matrix.normalMinY;
                    if(matrix.normalMaxY !== undefined) normalMaxY = matrix.normalMaxY;

                    switch(matrix.repeatMode)
                    {
                        case 'borders':
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_BORDERS;
                            break;
                        case 'center':
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_CENTER;
                            break;
                        case 'first':
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_FIRST;
                            break;
                        case 'last':
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_LAST;
                            break;
                        case 'random':
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM;
                            break;
                        default:
                            repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_DEFAULT;
                            break;
                    }

                    switch(matrix.align)
                    {
                        case 'top':
                            align = PlaneMaterialCellMatrix.ALIGN_TOP;
                            break;
                        case 'bottom':
                            align = PlaneMaterialCellMatrix.ALIGN_BOTTOM;
                            break;
                        default:
                            align = PlaneMaterialCellMatrix.ALIGN_DEFAULT;
                            break;
                    }

                    if(matrix.columns && matrix.columns.length)
                    {
                        const cellMatrix = newMaterial.addMaterialCellMatrix(matrix.columns.length, repeatMode, align, normalMinX, normalMaxX, normalMinY, normalMaxY);

                        let index = 0;

                        while(index < matrix.columns.length)
                        {
                            const column = matrix.columns[index];

                            if(column) this.parsePlaneMaterialCellColumn(column, cellMatrix, index);

                            index++;
                        }
                    }
                }
            }

            this._materials.set(id, newMaterial);
        }
    }

    private parsePlaneMaterialCellColumn(column: IAssetPlaneMaterialCellColumn, cellMatrix: PlaneMaterialCellMatrix, index: number): void
    {
        if(!column || !cellMatrix) return;

        let repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_ALL;

        const width = column.width;

        const cells = this.parsePlaneMaterialCells(column);

        switch(column.repeatMode)
        {
            case 'borders':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_BORDERS;
                break;
            case 'center':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_CENTER;
                break;
            case 'first':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_FIRST;
                break;
            case 'last':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_LAST;
                break;
            case 'none':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_NONE;
                break;
            default:
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_ALL;
                break;
        }

        cellMatrix.createColumn(index, width, cells, repeatMode);
    }

    private parsePlaneMaterialCells(column: IAssetPlaneMaterialCellColumn): PlaneMaterialCell[]
    {
        if(!column || !column.cells || !column.cells.length) return null;

        const cells: PlaneMaterialCell[] = [];

        let index = 0;

        while(index < column.cells.length)
        {
            const cell = column.cells[index];

            if(cell)
            {
                const textureId = cell.textureId;

                let assetNames: string[] = null;
                let offsetPoints: Point[] = null;
                let graphics: IGraphicAsset[] = null;
                let limit = 0;

                if(cell.extraData)
                {
                    const types = cell.extraData.extraItemTypes;
                    const offsets = cell.extraData.offsets;

                    if(types && offsets)
                    {
                        if(types.length && offsets.length)
                        {
                            assetNames = this.parseExtraItemTypes(types);
                            offsetPoints = this.parseExtraItemOffsets(offsets);
                            limit = offsetPoints.length;

                            if(cell.extraData.limitMax !== undefined) limit = cell.extraData.limitMax;
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

                const texture = this.getTexture(textureId);
                const newCell = new PlaneMaterialCell(texture, graphics, offsetPoints, limit);

                cells.push(newCell);
            }

            index++;
        }

        if(!cells || !cells.length) return null;

        return cells;
    }

    private parseExtraItemTypes(k: string[]): string[]
    {
        const assetNames: string[] = [];

        if(k && k.length)
        {
            let index = 0;

            while(index < k.length)
            {
                const type = k[index];

                if(type) assetNames.push(type);

                index++;
            }
        }

        return assetNames;
    }

    private parseExtraItemOffsets(k: [ number, number][]): Point[]
    {
        const offsets: Point[] = [];

        if(k && k.length)
        {
            let index = 0;

            while(index < k.length)
            {
                const [ x, y ] = k[index];

                offsets.push(new Point(x, y));

                index++;
            }
        }

        return offsets;
    }

    protected getGeometry(size: number, horizontalAngle: number, verticalAngle: number): IRoomGeometry
    {
        horizontalAngle = Math.abs(horizontalAngle);
        if(horizontalAngle > 90) horizontalAngle = 90;

        verticalAngle = Math.abs(verticalAngle);
        if(verticalAngle > 90) verticalAngle = 90;

        const identifier = `${size}_${Math.round(horizontalAngle)}_${Math.round(verticalAngle)}`;

        let geometry = this._geometries.get(identifier);

        if(geometry) return geometry;

        geometry = new RoomGeometry(size, new Vector3d(horizontalAngle, verticalAngle), new Vector3d(-10, 0, 0));

        this._geometries.set(identifier, geometry);

        return geometry;
    }

    protected parseVisualizations(plane: Plane, visualizations: IAssetPlaneVisualization[]): void
    {
        if(!plane || !visualizations) return;

        if(visualizations && visualizations.length)
        {
            for(const visualization of visualizations)
            {
                if(!visualization) continue;

                const size = visualization.size;

                let horizontalAngle = FloorPlane.HORIZONTAL_ANGLE_DEFAULT;
                let verticalAngle = FloorPlane.VERTICAL_ANGLE_DEFAULT;

                if(visualization.horizontalAngle !== undefined) horizontalAngle = visualization.horizontalAngle;
                if(visualization.verticalAngle !== undefined) verticalAngle = visualization.verticalAngle;

                const layers = visualization.allLayers as IAssetPlaneVisualizationLayer[];

                const planeVisualization = plane.createPlaneVisualization(size, ((layers && layers.length) || 0), this.getGeometry(size, horizontalAngle, verticalAngle));

                if(planeVisualization && (layers && layers.length))
                {
                    let layerId = 0;

                    while(layerId < layers.length)
                    {
                        const layer = layers[layerId];

                        if(layer)
                        {
                            let material: PlaneMaterial = null;
                            let align: number = PlaneVisualizationLayer.ALIGN_DEFAULT;
                            let color: number = FloorPlane.DEFAULT_COLOR;
                            let offset: number = PlaneVisualizationLayer.DEFAULT_OFFSET;

                            if(layer.materialId) material = this.getMaterial(layer.materialId);

                            if(layer.color) color = layer.color;

                            if(layer.offset) offset = layer.offset;

                            if(layer.align)
                            {
                                if(layer.align === 'bottom') align = PlaneVisualizationLayer.ALIGN_BOTTOM;

                                else if(layer.align == 'top') align = PlaneVisualizationLayer.ALIGN_TOP;
                            }

                            planeVisualization.setLayer(layerId, material, color, align, offset);
                        }

                        layerId++;
                    }
                }
            }
        }
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, id: string, width: number, height: number, size: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, timeSinceStartMs: number = 0): PlaneBitmapData
    {
        return null;
    }

    public getTextureIdentifier(k: number, normal: IVector3D): string
    {
        return k.toString();
    }

    public getLayers(id: string): PlaneVisualizationLayer[]
    {
        let planes = this.getPlane(id);

        if(!planes) planes = this.getPlane(PlaneRasterizer.DEFAULT);

        return planes.getLayers();
    }
}
