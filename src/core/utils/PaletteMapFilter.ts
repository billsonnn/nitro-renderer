import { NitroFilter, NitroTexture } from './proxy';

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
    if(channel == 0)
    {
        vec2 index = vec2(int(currentColor.r * 255.0), 0.5);
        vec4 newColor = texture2D(lut, index);
        gl_FragColor = vec4(newColor.r, newColor.g, newColor.b, currentColor.a);
    } else if(channel == 1) {
        vec2 index = vec2(int(currentColor.g * 255.0), 0.5);
        vec4 newColor = texture2D(lut, index);
        gl_FragColor = vec4(newColor.r, newColor.g, newColor.b, currentColor.a);
    } else if(channel == 2) {
        vec2 index = vec2(int(currentColor.b * 255.0), 0.5);
        vec4 newColor = texture2D(lut, index);
        gl_FragColor = vec4(newColor.r, newColor.g, newColor.b, currentColor.a);
    } else if(channel == 3) {
        vec2 index = vec2(int(currentColor.a * 255.0), 0.5);
        vec4 newColor = texture2D(lut, index);
        gl_FragColor = vec4(newColor.r, newColor.g, newColor.b, currentColor.a);
    }
    
}`;

export class PaletteMapFilter extends NitroFilter
{
    private _lut: NitroTexture;
    private _channel: number;

    constructor(reds: number[], greens: number[], blues: number[], alphas: number[])
    {
        super(vertex, fragment);
        this._channel = this.getChannelForPalette(reds, greens, blues, alphas);
        const lut = this.getLutForPalette(reds);
        this._lut = NitroTexture.fromBuffer(Uint8Array.from(lut), lut.length / 4, 1);
        this.uniforms.lut = this._lut;
        this.uniforms.channel = this._channel;
        this.uniforms.lut.baseTexture.mipmap = false;
    }

    private getLutForPalette(data: number[]): number[]
    {
        const lut = [];
        for(let i = 0; i < data.length; i++)
        {
            // R
            lut[(i * 4)] = ((data[i] >> 16) & 0xFF) / 0xff;
            // G
            lut[(i * 4) + 1] = ((data[i] >> 8) & 0xFF) / 0xff;
            // B
            lut[(i * 4) + 2] = (data[i] & 0xFF) / 0xff;
            // A
            lut[(i * 4) + 3] = ((data[i] >> 24) & 0xFF) / 0xff;
        }
        console.log(lut);
        return lut;
    }

    private getChannelForPalette(reds: number[], greens: number[], blues: number[], alphas: number[]): number
    {
        if(reds.length === 256) return 0;
        if(greens.length === 256) return 1;
        if(blues.length === 256) return 2;
        if(alphas.length === 256) return 3;
    }

    public get lut(): NitroTexture
    {
        return this._lut;
    }

    public get channel(): number
    {
        return this._channel;
    }
}
