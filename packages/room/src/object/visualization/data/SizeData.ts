import { IAssetColor, IAssetVisualizationDirection, IAssetVisualizationLayer } from '@nitrots/api';
import { BLEND_MODES } from 'pixi.js';
import { ColorData } from './ColorData';
import { DirectionData } from './DirectionData';
import { LayerData } from './LayerData';

export class SizeData
{
    public static MAX_LAYERS: number = 26;

    private _layerCount: number;
    private _angle: number;

    private _defaultDirection: DirectionData;
    private _directions: Map<number, DirectionData>;
    private _colors: ColorData[];
    private _lastDirectionData: DirectionData;
    private _lastDirection: number;

    constructor(layerCount: number, angle: number)
    {
        this._layerCount = ((layerCount < 0) ? 0 : ((layerCount > SizeData.MAX_LAYERS) ? SizeData.MAX_LAYERS : layerCount));
        this._angle = angle < 1 ? 1 : angle > 360 ? 360 : angle;

        this._defaultDirection = new DirectionData(this._layerCount);
        this._directions = new Map();
        this._colors = [];
        this._lastDirectionData = null;
        this._lastDirection = -1;
    }

    public dispose(): void
    {
        if(this._defaultDirection) this._defaultDirection.dispose();

        for(const direction of this._directions.values())
        {
            if(!direction) continue;

            direction.dispose();
        }

        for(const color of this._colors)
        {
            if(!color) continue;

            color.dispose();
        }

        this.reset();
    }

    protected reset(): void
    {
        this._defaultDirection = null;
        this._colors = [];
        this._lastDirectionData = null;
        this._lastDirection = -1;

        this._directions.clear();
    }

    public processLayers(layers: { [index: string]: IAssetVisualizationLayer }): boolean
    {
        if(!layers) return false;

        return this.setDirectionLayers(this._defaultDirection, layers);
    }

    public processDirections(directions: { [index: string]: IAssetVisualizationDirection }): boolean
    {
        if(!directions) return false;

        for(const key in directions)
        {
            const direction = directions[key];

            if(!direction) continue;

            const directionNumber = parseInt(key);

            if(this._directions.get(directionNumber)) return false;

            const directionData = new DirectionData(this._layerCount);

            directionData.setFromDirection(this._defaultDirection);

            this.setDirectionLayers(directionData, direction.layers);

            this._directions.set(directionNumber, directionData);

            this._lastDirectionData = null;
            this._lastDirection = -1;
        }

        return true;
    }

    public processColors(colors: { [index: string]: IAssetColor }): boolean
    {
        if(!colors) return false;

        for(const key in colors)
        {
            const color = colors[key];

            if(!color) continue;

            const colorNumber = parseInt(key);

            if(this._colors[colorNumber]) return false;

            const colorData = new ColorData(this._layerCount);

            for(const layer in color.layers)
            {
                const colorLayer = color.layers[layer];

                if(!colorLayer) continue;

                const layerId = parseInt(layer);
                const colorId = colorLayer.color;

                colorData.setColorLayer(layerId, colorId);
            }

            this._colors[colorNumber] = colorData;
        }

        return true;
    }

    private setDirectionLayers(directionData: DirectionData, layers: { [index: string]: IAssetVisualizationLayer }): boolean
    {
        if(!directionData || !layers) return false;

        for(const key in layers)
        {
            const layer = layers[key];

            if(!layer) continue;

            const layerId = parseInt(key);

            if(layerId < 0 || (layerId >= this._layerCount)) return false;

            // TODO: check the .nitro files for inks
            if(layer.ink !== undefined) directionData.setLayerBlendMode(layerId, (layer.ink?.toLowerCase() as BLEND_MODES));

            if(layer.tag !== undefined) directionData.setLayerTag(layerId, layer.tag);

            if(layer.alpha !== undefined) directionData.setLayerAlpha(layerId, layer.alpha);

            if(layer.ignoreMouse !== undefined) directionData.setLayerIgnoreMouse(layerId, layer.ignoreMouse);

            if(layer.x !== undefined) directionData.setLayerXOffset(layerId, layer.x);

            if(layer.y !== undefined) directionData.setLayerYOffset(layerId, layer.y);

            if(layer.z !== undefined) directionData.setLayerZOffset(layerId, (layer.z / -1000));
        }

        return true;
    }

    public getValidDirection(direction: number): number
    {
        const existing = this._directions.get(direction);

        if(existing) return direction;

        direction = (((direction % 360) + 360) % 360);

        let currentAngle = -1;
        let validDirection = -1;

        for(const key of this._directions.keys())
        {
            let angle = ((((key * this._angle) - direction) + 360) % 360);

            if(angle > 180) angle = (360 - angle);

            if((angle < currentAngle) || (currentAngle < 0))
            {
                currentAngle = angle;
                validDirection = key;
            }
        }

        if(validDirection >= 0) return Math.trunc(validDirection);

        return 0;
    }

    public getDirectionData(direction: number): DirectionData
    {
        if(direction === this._lastDirection && this._lastDirectionData) return this._lastDirectionData;

        let directionData = this._directions.get(direction);

        if(!directionData) directionData = this._defaultDirection;

        this._lastDirection = direction;
        this._lastDirectionData = directionData;

        return this._lastDirectionData;
    }

    public getLayerTag(direction: number, layerId: number): string
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_TAG;

        return directionData.getLayerTag(layerId);
    }

    public getLayerBlendMode(direction: number, layerId: number): BLEND_MODES
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_BLEND_MODE;

        return directionData.getLayerBlendMode(layerId);
    }

    public getLayerAlpha(direction: number, layerId: number): number
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_ALPHA;

        return directionData.getLayerAlpha(layerId);
    }

    public getLayerColor(layerId: number, colorId: number): number
    {
        const existing = this._colors[colorId];

        if(!existing) return ColorData.DEFAULT_COLOR;

        return existing.getLayerColor(layerId);
    }

    public getLayerIgnoreMouse(direction: number, layerId: number): boolean
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_IGNORE_MOUSE;

        return directionData.getLayerIgnoreMouse(layerId);
    }

    public getLayerXOffset(direction: number, layerId: number): number
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_XOFFSET;

        return directionData.getLayerXOffset(layerId);
    }

    public getLayerYOffset(direction: number, layerId: number): number
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_YOFFSET;

        return directionData.getLayerYOffset(layerId);
    }

    public getLayerZOffset(direction: number, layerId: number): number
    {
        const directionData = this.getDirectionData(direction);

        if(!directionData) return LayerData.DEFAULT_ZOFFSET;

        return directionData.getLayerZOffset(layerId);
    }

    public get layerCount(): number
    {
        return this._layerCount;
    }
}
