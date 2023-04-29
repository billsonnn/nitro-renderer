import { Filter, RenderTexture } from '@pixi/core';

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
uniform sampler2D mask;
uniform int fromChannel;
uniform int toChannel;

void main(void) {
    vec4 maskColor = texture2D(mask, vTextureCoord);
    vec4 currentColor = texture2D(uSampler, vTextureCoord);
    vec4 adjusted = currentColor;

    if(maskColor.r == 0.0 && maskColor.g == 0.0 && maskColor.b == 0.0)
    {
        adjusted.a = 0.0;
    }

    gl_FragColor = vec4(adjusted.r, adjusted.g, adjusted.b, adjusted.a);
}`;

export class CopyChannelFilter extends Filter
{
    public static readonly CHANNEL_RED = 0;
    public static readonly CHANNEL_GREEN = 1;
    public static readonly CHANNEL_BLUE = 2;
    public static readonly CHANNEL_ALPHA = 3;

    constructor(mask: RenderTexture, fromChannel: number, toChannel: number)
    {
        super(vertex, fragment, {
            mask: mask.castToBaseTexture(),
            fromChannel,
            toChannel
        });
    }
}
