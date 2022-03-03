import { Resource, Texture } from '@pixi/core';
import { NitroSprite } from '../../../../core';
import { TextureUtils } from '../../../utils';

export class GraphicAssetPalette
{
    private _palette: [ number, number, number ][];
    private _primaryColor: number;
    private _secondaryColor: number;

    constructor(palette: [ number, number, number ][], primaryColor: number, secondaryColor: number)
    {
        this._palette = palette;

        while(this._palette.length < 256) this._palette.push([ 0, 0, 0 ]);

        this._primaryColor = primaryColor;
        this._secondaryColor = secondaryColor;
    }

    public dispose(): void
    {

    }

    public applyPalette(texture: Texture<Resource>): Texture<Resource>
    {
        const sprite = new NitroSprite(texture);
        const textureCanvas = TextureUtils.generateCanvas(sprite);
        const textureCtx = textureCanvas.getContext('2d');
        const textureImageData = textureCtx.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
        const data = textureImageData.data;

        for(let i = 0; i < data.length; i += 4)
        {
            let paletteColor = this._palette[data[ i + 1 ]];

            if(paletteColor === undefined) paletteColor = [ 0, 0, 0 ];

            data[ i ] = paletteColor[0];
            data[ i + 1 ] = paletteColor[1];
            data[ i + 2 ] = paletteColor[2];
        }

        textureCtx.putImageData(textureImageData, 0, 0);

        return Texture.from(textureCanvas);
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
