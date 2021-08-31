import { NitroFilter } from './proxy';

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
uint8_t reds[256];
uint8_t greens[256];
uint8_t blues[256];
uint8_t alphas[256];

void main(void) {
    vec4 currentColor = texture2D(uSampler, vTextureCoord);
    vec4 newColor =
    
    gl_FragColor = vec4(newColor.r, newColor.g, newColor.b, newColor.a);
}`;

export class PaletteMapFilter extends NitroFilter
{
    private _reds: number[];
    private _greens: number[];
    private _blues: number[];
    private _alphas: number[];

    constructor(reds: number[], greens: number[], blues: number[], alphas: number[])
    {
        super(vertex, fragment);

        this._reds = reds;
        this._greens = greens;
        this._blues = blues;
        this._alphas = alphas;
    }

    public get reds(): number[]
    {
        return this._reds;
    }

    public get blues(): number[]
    {
        return this._blues;
    }

    public get greens(): number[]
    {
        return this._greens;
    }

    public get alphas(): number[]
    {
        return this._alphas;
    }
}
