import { IRoomGeometry } from '../../../../../../../room/utils/IRoomGeometry';
import { PlaneVisualization } from './PlaneVisualization';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

export class Plane
{
    private _planeVisualizations: Map<string, PlaneVisualization>;
    private _sizes: number[];
    private _lastPlaneVisualization: PlaneVisualization;
    private _lastSize: number;

    constructor()
    {
        this._planeVisualizations       = new Map();
        this._sizes                     = [];
        this._lastPlaneVisualization    = null;
        this._lastSize                  = -1;
    }

    public isStatic(k: number): boolean
    {
        return true;
    }

    public dispose(): void
    {
        for(const visualization of this._planeVisualizations.values())
        {
            if(!visualization) continue;

            visualization.dispose();
        }

        this._planeVisualizations       = null;
        this._lastPlaneVisualization    = null;
        this._sizes                     = null;
        this._lastSize                  = -1;
    }

    public clearCache(): void
    {
        for(const visualization of this._planeVisualizations.values())
        {
            if(!visualization) continue;

            visualization.clearCache();
        }
    }

    public createPlaneVisualization(k: number, _arg_2: number, _arg_3: IRoomGeometry): PlaneVisualization
    {
        const existing = this._planeVisualizations.get(k.toString());

        if(existing) return null;

        const plane = new PlaneVisualization(k, _arg_2, _arg_3);

        this._planeVisualizations.set(k.toString(), plane);

        this._sizes.push(k);
        this._sizes.sort();

        return plane;
    }

    private getSizeIndex(k: number): number
    {
        let size = 0;
        let index = 1;

        while(index < this._sizes.length)
        {
            if(this._sizes[index] > k)
            {
                if((this._sizes[index] - k) < (k - this._sizes[(index - 1)])) size = index;

                break;
            }

            size = index;

            index++;
        }

        return size;
    }

    protected getPlaneVisualization(k: number): PlaneVisualization
    {
        if(k === this._lastSize) return this._lastPlaneVisualization;

        const sizeIndex = this.getSizeIndex(k);

        if(sizeIndex < this._sizes.length)
        {
            this._lastPlaneVisualization = this._planeVisualizations.get(this._sizes[sizeIndex].toString());
        }
        else
        {
            this._lastPlaneVisualization = null;
        }

        this._lastSize = k;

        return this._lastPlaneVisualization;
    }

    public getLayers(): PlaneVisualizationLayer[]
    {
        return this.getPlaneVisualization(this._lastSize).getLayers();
    }
}
