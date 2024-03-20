import { IGraphicAsset, IVector3D } from '@nitrots/api';
import { PlaneMaskVisualization } from './PlaneMaskVisualization';

export class PlaneMask
{
    private _maskVisualizations: Map<number, PlaneMaskVisualization>;
    private _sizes: number[];
    private _assetNames: Map<number, string>;
    private _lastMaskVisualization: PlaneMaskVisualization;
    private _lastSize: number;

    constructor()
    {
        this._sizes = [];
        this._maskVisualizations = new Map();
        this._assetNames = new Map();
        this._lastMaskVisualization = null;
        this._lastSize = -1;
    }

    public dispose(): void
    {
        if(this._maskVisualizations)
        {
            for(const mask of this._maskVisualizations.values())
            {
                if(!mask) continue;

                mask.dispose();
            }

            this._maskVisualizations = null;
        }

        this._lastMaskVisualization = null;
        this._sizes = null;
    }

    public createMaskVisualization(size: number): PlaneMaskVisualization
    {
        const existing = this._maskVisualizations.get(size);

        if(existing) return null;

        const visualization = new PlaneMaskVisualization();

        this._maskVisualizations.set(size, visualization);

        this._sizes.push(size);
        this._sizes.sort();

        return visualization;
    }

    private getSizeIndex(k: number): number
    {
        let sizeIndex = 0;
        let index = 1;

        while(index < this._sizes.length)
        {
            if(this._sizes[index] > k)
            {
                if((this._sizes[index] - k) < (k - this._sizes[(index - 1)])) sizeIndex = index;

                break;
            }

            sizeIndex = index;

            index++;
        }

        return sizeIndex;
    }

    protected getMaskVisualization(k: number): PlaneMaskVisualization
    {
        if(k === this._lastSize) return this._lastMaskVisualization;

        const sizeIndex = this.getSizeIndex(k);

        if(sizeIndex < this._sizes.length)
        {
            this._lastMaskVisualization = (this._maskVisualizations.get(this._sizes[sizeIndex]));
        }
        else
        {
            this._lastMaskVisualization = null;
        }

        this._lastSize = k;

        return this._lastMaskVisualization;
    }

    public getGraphicAsset(k: number, _arg_2: IVector3D): IGraphicAsset
    {
        const visualization = this.getMaskVisualization(k);

        if(!visualization) return null;

        return visualization.getAsset(_arg_2);
    }

    public getAssetName(k: number): string
    {
        if(!this._assetNames) return null;

        return this._assetNames.get(k) || null;
    }

    public setAssetName(k: number, _arg_2: string): void
    {
        if(!this._assetNames) return;

        this._assetNames.set(k, _arg_2);
    }
}
