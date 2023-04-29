import { IRoomGeometry } from '../../../../../../../api';
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
        this._planeVisualizations = new Map();
        this._sizes = [];
        this._lastPlaneVisualization = null;
        this._lastSize = -1;
    }

    public isStatic(size: number): boolean
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

        this._planeVisualizations = null;
        this._lastPlaneVisualization = null;
        this._sizes = null;
        this._lastSize = -1;
    }

    public clearCache(): void
    {
        for(const visualization of this._planeVisualizations.values())
        {
            if(!visualization) continue;

            visualization.clearCache();
        }
    }

    public createPlaneVisualization(size: number, totalLayers: number, geometry: IRoomGeometry): PlaneVisualization
    {
        const existing = this._planeVisualizations.get(size.toString());

        if(existing) return null;

        const plane = new PlaneVisualization(size, totalLayers, geometry);

        this._planeVisualizations.set(size.toString(), plane);

        this._sizes.push(size);
        this._sizes.sort();

        return plane;
    }

    private getSizeIndex(size: number): number
    {
        let sizeIndex = 0;
        let i = 1;

        while(i < this._sizes.length)
        {
            if(this._sizes[i] > size)
            {
                if((this._sizes[i] - size) < (size - this._sizes[(i - 1)])) sizeIndex = i;

                break;
            }

            sizeIndex = i;

            i++;
        }

        return sizeIndex;
    }

    public getPlaneVisualization(size: number): PlaneVisualization
    {
        if(size === this._lastSize) return this._lastPlaneVisualization;

        const sizeIndex = this.getSizeIndex(size);

        if(sizeIndex < this._sizes.length)
        {
            this._lastPlaneVisualization = this._planeVisualizations.get(this._sizes[sizeIndex].toString());
        }
        else
        {
            this._lastPlaneVisualization = null;
        }

        this._lastSize = size;

        return this._lastPlaneVisualization;
    }

    public getLayers(): PlaneVisualizationLayer[]
    {
        return this.getPlaneVisualization(this._lastSize).getLayers();
    }
}
