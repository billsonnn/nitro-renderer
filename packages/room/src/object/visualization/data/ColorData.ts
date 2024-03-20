export class ColorData
{
    public static DEFAULT_COLOR: number = 0xFFFFFF;

    private _colors: number[];

    constructor(layerCount: number)
    {
        this._colors = [];

        this.createColors(layerCount);
    }

    private createColors(count: number): void
    {
        if(!count) return;

        for(let i = 0; i < count; i++) this._colors.push(ColorData.DEFAULT_COLOR);
    }

    public dispose(): void
    {
        this._colors = [];
    }

    public getLayerColor(layerId: number): number
    {
        const existing = this._colors[layerId];

        if(!existing) return ColorData.DEFAULT_COLOR;

        return existing;
    }

    public setColorLayer(layerId: number, color: number): void
    {
        const existing = this._colors[layerId];

        if(!existing) return;

        this._colors[layerId] = color;
    }
}