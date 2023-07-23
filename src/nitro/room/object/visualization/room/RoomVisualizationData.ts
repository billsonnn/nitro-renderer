import { IAssetData, IGraphicAssetCollection, IObjectVisualizationData } from '../../../../../api';
import { PlaneMaskManager } from './mask';
import { FloorRasterizer, LandscapeRasterizer, WallRasterizer } from './rasterizer';

export class RoomVisualizationData implements IObjectVisualizationData
{
    private _wallRasterizer: WallRasterizer = new WallRasterizer();
    private _floorRasterizer: FloorRasterizer = new FloorRasterizer();
    private _landscapeRasterizer: LandscapeRasterizer = new LandscapeRasterizer();
    private _maskManager: PlaneMaskManager = new PlaneMaskManager();
    private _initialized: boolean = false;

    public initialize(asset: IAssetData): boolean
    {
        if(!asset.roomVisualization) return false;

        const wallData = asset.roomVisualization.wallData;

        if(wallData) this._wallRasterizer.initialize(wallData);

        const floorData = asset.roomVisualization.floorData;

        if(floorData) this._floorRasterizer.initialize(floorData);

        const landscapeData = asset.roomVisualization.landscapeData;

        if(landscapeData) this._landscapeRasterizer.initialize(landscapeData);

        const maskData = asset.roomVisualization.maskData;

        if(maskData) this._maskManager.initialize(maskData);

        return true;
    }

    public dispose(): void
    {
        if(this._wallRasterizer)
        {
            this._wallRasterizer.dispose();

            this._wallRasterizer = null;
        }

        if(this._floorRasterizer)
        {
            this._floorRasterizer.dispose();

            this._floorRasterizer = null;
        }

        if(this._landscapeRasterizer)
        {
            this._landscapeRasterizer.dispose();

            this._landscapeRasterizer = null;
        }

        if(this._maskManager)
        {
            this._maskManager.dispose();

            this._maskManager = null;
        }
    }

    public setGraphicAssetCollection(collection: IGraphicAssetCollection): void
    {
        if(this._initialized) return;

        this._wallRasterizer.initializeAssetCollection(collection);
        this._floorRasterizer.initializeAssetCollection(collection);
        this._landscapeRasterizer.initializeAssetCollection(collection);
        this._maskManager.initializeAssetCollection(collection);

        this._initialized = true;
    }

    public clearCache(): void
    {
        if(this._wallRasterizer) this._wallRasterizer.clearCache();

        if(this._floorRasterizer) this._floorRasterizer.clearCache();

        if(this._landscapeRasterizer) this._landscapeRasterizer.clearCache();
    }

    public get wallRasterizer(): WallRasterizer
    {
        return this._wallRasterizer;
    }

    public get floorRasterizer(): FloorRasterizer
    {
        return this._floorRasterizer;
    }

    public get landscapeRasterizer(): LandscapeRasterizer
    {
        return this._landscapeRasterizer;
    }

    public get maskManager(): PlaneMaskManager
    {
        return this._maskManager;
    }
}
