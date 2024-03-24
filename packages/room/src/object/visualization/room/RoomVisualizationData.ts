import { IAssetData, IGraphicAssetCollection, IObjectVisualizationData } from '@nitrots/api';
import { PlaneMaskManager } from './mask';

export class RoomVisualizationData implements IObjectVisualizationData
{
    private _maskManager: PlaneMaskManager = new PlaneMaskManager();
    private _initialized: boolean = false;

    public initialize(asset: IAssetData): boolean
    {
        if(!asset.roomVisualization) return false;

        const maskData = asset.roomVisualization.maskData;

        if(maskData) this._maskManager.initialize(maskData);

        return true;
    }

    public dispose(): void
    {
        if(this._maskManager)
        {
            this._maskManager.dispose();

            this._maskManager = null;
        }
    }

    public setGraphicAssetCollection(collection: IGraphicAssetCollection): void
    {
        if(this._initialized) return;

        this._maskManager.initializeAssetCollection(collection);

        this._initialized = true;
    }

    public clearCache(): void
    {
    }

    public get maskManager(): PlaneMaskManager
    {
        return this._maskManager;
    }
}
