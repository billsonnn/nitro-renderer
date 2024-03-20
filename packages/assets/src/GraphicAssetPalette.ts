import { IGraphicAssetPalette } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Texture } from 'pixi.js';

export class GraphicAssetPalette implements IGraphicAssetPalette
{
    private _palette: [number, number, number][];
    private _primaryColor: number;
    private _secondaryColor: number;

    constructor(palette: [number, number, number][], primaryColor: number, secondaryColor: number)
    {
        this._palette = palette;

        while(this._palette.length < 256) this._palette.push([0, 0, 0]);

        this._primaryColor = primaryColor;
        this._secondaryColor = secondaryColor;
    }

    public applyPalette(texture: Texture): Texture
    {
        const pixelOutput = TextureUtils.getPixels(texture);
        const pixels = pixelOutput?.pixels;

        if(pixels)
        {
            for(let i = 0; i < pixels.length; i += 4)
            {
                let paletteColor = this._palette[pixels[i + 1]];

                if(paletteColor === undefined) paletteColor = [0, 0, 0];

                pixels[i] = paletteColor[0];
                pixels[i + 1] = paletteColor[1];
                pixels[i + 2] = paletteColor[2];
            }
        }

        return Texture.from(pixelOutput);
    }

    public get primaryColor(): number
    {
        return this._primaryColor;
    }

    public get secondaryColor(): number
    {
        return this._secondaryColor;
    }
}
