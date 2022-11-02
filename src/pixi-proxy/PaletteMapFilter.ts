import { NitroBaseTexture } from './NitroBaseTexture';
import { NitroFilter } from './NitroFilter';

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
            adjusted = texture2D(lut, vec2((currentColor.r * 255.0 + 0.5) / 256.0, 0.5));
        } else if(channel == 1) {
            adjusted = texture2D(lut, vec2((currentColor.g * 255.0 + 0.5) / 256.0, 0.5));
        } else if(channel == 2) {
            adjusted = texture2D(lut, vec2((currentColor.b * 255.0 + 0.5) / 256.0, 0.5));
        } else if(channel == 3) {
            adjusted = texture2D(lut, vec2((currentColor.a * 255.0 + 0.5) / 256.0, 0.5));
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

    private _lut: NitroBaseTexture;
    private _channel: number;

    constructor(palette: number[], channel = PaletteMapFilter.CHANNEL_RED)
    {
        super(vertex, fragment);
        this._channel = channel;
        let lut: number[] = [];

        lut = this.getLutForPalette(palette);

        this._lut = NitroBaseTexture.fromBuffer(Uint8Array.from(lut), lut.length / 4, 1, { mipmap: 0, scaleMode: 0 });

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

    public get lut(): NitroBaseTexture
    {
        return this._lut;
    }

    public get channel(): number
    {
        return this._channel;
    }
}
