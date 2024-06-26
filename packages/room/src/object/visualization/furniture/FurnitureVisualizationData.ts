import { IAssetData, IAssetVisualizationData, IObjectVisualizationData } from '@nitrots/api';
import { BLEND_MODES } from 'pixi.js';
import { ColorData, LayerData, SizeData } from '../data';

export class FurnitureVisualizationData implements IObjectVisualizationData
{
    public static LAYER_LETTERS: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    private _type: string = '';
    private _sizes: number[] = [];
    private _sizeDatas: Map<number, SizeData> = new Map();
    private _lastSize: number = -1;
    private _lastSizeScale: number = -1;
    private _lastSizeData: SizeData = null;
    private _lastSizeDataScale: number = -1;

    public initialize(asset: IAssetData): boolean
    {
        this.reset();

        if(!asset) return false;

        this._type = asset.name;

        if(!this.defineVisualizations(asset.visualizations))
        {
            this.reset();

            return false;
        }

        return true;
    }

    public dispose(): void
    {
        if(this._sizeDatas && this._sizeDatas.size)
        {
            for(const size of this._sizeDatas.values()) size && size.dispose();

            this._sizeDatas = null;
        }

        this._lastSizeData = null;
        this._sizes = null;
    }

    private reset(): void
    {
        this._type = '';

        if(this._sizeDatas && this._sizeDatas.size)
        {
            for(const size of this._sizeDatas.values()) size && size.dispose();
        }

        this._sizeDatas.clear();

        this._sizes = [];
        this._lastSizeData = null;
        this._lastSizeDataScale = -1;
    }

    protected createSizeData(scale: number, layerCount: number, angle: number): SizeData
    {
        return new SizeData(layerCount, angle);
    }

    protected defineVisualizations(visualizations: IAssetVisualizationData[]): boolean
    {
        if(!visualizations) return false;

        for(const visualizationId of Object.keys(visualizations))
        {
            const visualization = visualizations[visualizationId];

            const layerCount = visualization.layerCount;
            const angle = visualization.angle;

            let size = visualization.size;

            if(size < 1) size = 1;

            if(this._sizeDatas.get(size)) return false;

            const sizeData = this.createSizeData(size, layerCount, angle);

            if(!sizeData) return false;

            for(const key in visualization)
            {
                //@ts-ignore
                const data = visualization[key];

                if(!this.processVisualElement(sizeData, key, data))
                {
                    sizeData.dispose();

                    return false;
                }
            }

            this._sizeDatas.set(size, sizeData);

            this._sizes.push(size);
        }

        this._sizes.sort();

        return true;
    }

    protected processVisualElement(sizeData: SizeData, key: string, data: any): boolean
    {
        if(!sizeData || !key || !data) return false;

        switch(key)
        {
            case 'layers':
                if(!sizeData.processLayers(data)) return false;
                break;
            case 'directions':
                if(!sizeData.processDirections(data)) return false;
                break;
            case 'colors':
                if(!sizeData.processColors(data)) return false;
                break;
        }

        return true;
    }

    public getValidSize(scale: number): number
    {
        if(scale === this._lastSizeScale) return this._lastSize;

        const sizeIndex = this.getSizeIndex(scale);

        let newScale = -1;

        if(sizeIndex < this._sizes.length) newScale = this._sizes[sizeIndex];

        this._lastSizeScale = scale;
        this._lastSize = newScale;

        return newScale;
    }

    private getSizeIndex(size: number): number
    {
        if(size <= 0) return 0;

        let index = 0;
        let iterator = 1;

        while(iterator < this._sizes.length)
        {
            if(this._sizes[iterator] > size)
            {
                if((this._sizes[iterator] / size) < (size / this._sizes[(iterator - 1)])) index = iterator;

                break;
            }

            index = iterator;

            iterator++;
        }

        return index;
    }

    protected getSizeData(size: number): SizeData
    {
        if(size === this._lastSizeDataScale) return this._lastSizeData;

        const sizeIndex = this.getSizeIndex(size);

        if(sizeIndex < this._sizes.length) this._lastSizeData = this._sizeDatas.get(this._sizes[sizeIndex]);
        else this._lastSizeData = null;

        this._lastSizeDataScale = size;

        return this._lastSizeData;
    }

    public getLayerCount(scale: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_COUNT;

        return size.layerCount;
    }

    public getValidDirection(scale: number, direction: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_DIRECTION;

        return size.getValidDirection(direction);
    }

    public getLayerTag(scale: number, direction: number, layerId: number): string
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_TAG;

        return size.getLayerTag(direction, layerId);
    }

    public getLayerBlendMode(scale: number, direction: number, layerId: number): BLEND_MODES
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_BLEND_MODE;

        return size.getLayerBlendMode(direction, layerId);
    }

    public getLayerAlpha(scale: number, direction: number, layerId: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_ALPHA;

        return size.getLayerAlpha(direction, layerId);
    }

    public getLayerColor(scale: number, layerId: number, colorId: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return ColorData.DEFAULT_COLOR;

        return size.getLayerColor(layerId, colorId);
    }

    public getLayerIgnoreMouse(scale: number, direction: number, layerId: number): boolean
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_IGNORE_MOUSE;

        return size.getLayerIgnoreMouse(direction, layerId);
    }

    public getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_XOFFSET;

        return size.getLayerXOffset(direction, layerId);
    }

    public getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_YOFFSET;

        return size.getLayerYOffset(direction, layerId);
    }

    public getLayerZOffset(scale: number, direction: number, layerId: number): number
    {
        const size = this.getSizeData(scale);

        if(!size) return LayerData.DEFAULT_ZOFFSET;

        return size.getLayerZOffset(direction, layerId);
    }

    public get type(): string
    {
        return this._type;
    }
}
