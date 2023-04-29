import { Renderer, Resource, Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { PixiApplicationProxy, TextureUtils } from '../../pixi-proxy';

export class GraphicAssetPalette
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

    public dispose(): void
    {

    }

    public applyPalette(texture: Texture<Resource>): Texture<Resource>
    {
        const renderTexture = TextureUtils.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture));
        const pixels = TextureUtils.getPixels(renderTexture);

        for(let i = 0; i < pixels.length; i += 4)
        {
            let paletteColor = this._palette[pixels[i + 1]];

            if(paletteColor === undefined) paletteColor = [0, 0, 0];

            pixels[i] = paletteColor[0];
            pixels[i + 1] = paletteColor[1];
            pixels[i + 2] = paletteColor[2];
        }

        const canvaGLTexture = renderTexture.baseTexture._glTextures['1']?.texture;
        const gl = (PixiApplicationProxy.instance.renderer as Renderer)?.gl;

        gl.bindTexture(gl.TEXTURE_2D, canvaGLTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderTexture.width, renderTexture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.bindTexture(gl.TEXTURE_2D, null);

        return renderTexture;
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
