import { NitroBasetexture, NitroFilter } from './proxy';

const vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;
void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`;

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D lut;
uniform int channel;

void main(void) {
    vec4 currentColor = texture2D(uSampler, vTextureCoord);
    vec4 adjusted = currentColor;

    if(currentColor.a > 0.0)
    {
        if(channel == 0)
        {
            adjusted = texture2D(lut, vec2(currentColor.r, 0.5));
        } else if(channel == 1) {
            adjusted = texture2D(lut, vec2(currentColor.g, 0.5));
        } else if(channel == 2) {
            adjusted = texture2D(lut, vec2(currentColor.b, 0.5));
        } else if(channel == 3) {
            adjusted = texture2D(lut, vec2(currentColor.a, 0.5));
        }
    }

    gl_FragColor = vec4(adjusted.r, adjusted.g, adjusted.b, currentColor.a);
}`;

export class PaletteMapFilter extends NitroFilter
{
    public static readonly CHANNEL_RED = 0;
    public static readonly CHANNEL_GREEN = 1;
    public static readonly CHANNEL_BLUE = 2;
    public static readonly CHANNEL_ALPHA = 3;

    private _lut: NitroBasetexture;
    private _channel: number;

    constructor(reds: number[], greens: number[], blues: number[], alphas: number[])
    {
        super(vertex, fragment);
        this._channel = this.getChannelForPalette(reds, greens, blues, alphas);
        let lut: number[] = [];

        switch(this._channel)
        {
            case (PaletteMapFilter.CHANNEL_RED):
                lut = this.getLutForPalette(reds);
                break;
            case (PaletteMapFilter.CHANNEL_GREEN):
                lut = this.getLutForPalette(greens);
                break;
            case (PaletteMapFilter.CHANNEL_BLUE):
                lut = this.getLutForPalette(blues);
                break;
            case (PaletteMapFilter.CHANNEL_ALPHA):
                lut = this.getLutForPalette(alphas);
                break;
        }

        this._lut = NitroBasetexture.fromBuffer(Uint8Array.from(lut), lut.length / 4, 1);

        this.uniforms.lut = this._lut;
        this.uniforms.channel = this._channel;
    }

    private getLutForPalette(data: number[]): number[]
    {
        const lut = [];

        for(let i = 0; i < data.length; i++)
        {
            // R
            lut[(i * 4) + PaletteMapFilter.CHANNEL_RED] = ((data[i] >> 16) & 0xFF);
            // G
            lut[(i * 4) + PaletteMapFilter.CHANNEL_GREEN] = ((data[i] >> 8) & 0xFF);
            // B
            lut[(i * 4) + PaletteMapFilter.CHANNEL_BLUE] = (data[i] & 0xFF);
            // A
            lut[(i * 4) + PaletteMapFilter.CHANNEL_ALPHA] = ((data[i] >> 24) & 0xFF);
        }

        return lut;
    }

    private getChannelForPalette(reds: number[], greens: number[], blues: number[], alphas: number[]): number
    {
        if(reds.length === 256) return PaletteMapFilter.CHANNEL_RED;
        if(greens.length === 256) return PaletteMapFilter.CHANNEL_GREEN;
        if(blues.length === 256) return PaletteMapFilter.CHANNEL_BLUE;
        if(alphas.length === 256) return PaletteMapFilter.CHANNEL_ALPHA;
    }

    public get lut(): NitroBasetexture
    {
        return this._lut;
    }

    public get channel(): number
    {
        return this._channel;
    }
}