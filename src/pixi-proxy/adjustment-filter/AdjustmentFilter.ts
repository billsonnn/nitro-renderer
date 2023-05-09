import { CLEAR_MODES } from '@pixi/constants';
import { Filter, FilterSystem, RenderTexture } from '@pixi/core';

interface AdjustmentFilterOptions
{
    gamma: number;
    saturation: number;
    contrast: number;
    brightness: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export class AdjustmentFilter extends Filter
{
    /** The amount of luminance */
    public gamma = 1;

    /** The amount of saturation */
    public saturation = 1;

    /** The amount of contrast */
    public contrast = 1;

    /** The amount of brightness */
    public brightness = 1;

    /** The amount of red channel */
    public red = 1;

    /** The amount of green channel */
    public green = 1;

    /** The amount of blue channel */
    public blue = 1;

    /** The amount of alpha channel */
    public alpha = 1;

    /**
     * @param {object|number} [options] - The optional parameters of the filter.
     * @param {number} [options.gamma=1] - The amount of luminance
     * @param {number} [options.saturation=1] - The amount of color saturation
     * @param {number} [options.contrast=1] - The amount of contrast
     * @param {number} [options.brightness=1] - The overall brightness
     * @param {number} [options.red=1] - The multipled red channel
     * @param {number} [options.green=1] - The multipled green channel
     * @param {number} [options.blue=1] - The multipled blue channel
     * @param {number} [options.alpha=1] - The overall alpha amount
     */
    constructor(options?: Partial<AdjustmentFilterOptions>)
    {
        super(
            `attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;
            
            uniform mat3 projectionMatrix;
            
            varying vec2 vTextureCoord;
            
            void main(void)
            {
                gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
            }`,
            `varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            
            uniform float gamma;
            uniform float contrast;
            uniform float saturation;
            uniform float brightness;
            uniform float red;
            uniform float green;
            uniform float blue;
            uniform float alpha;
            
            void main(void)
            {
                vec4 c = texture2D(uSampler, vTextureCoord);
            
                if (c.a > 0.0) {
                    c.rgb /= c.a;
            
                    vec3 rgb = pow(c.rgb, vec3(1. / gamma));
                    rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);
                    rgb.r *= red;
                    rgb.g *= green;
                    rgb.b *= blue;
                    c.rgb = rgb * brightness;
            
                    c.rgb *= c.a;
                }
            
                gl_FragColor = c * alpha;
            }`);

        Object.assign(this, options);
    }

    /**
     * Override existing apply method in PIXI.Filter
     * @ignore
     */
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES): void
    {
        this.uniforms.gamma = Math.max(this.gamma, 0.0001);
        this.uniforms.saturation = this.saturation;
        this.uniforms.contrast = this.contrast;
        this.uniforms.brightness = this.brightness;
        this.uniforms.red = this.red;
        this.uniforms.green = this.green;
        this.uniforms.blue = this.blue;
        this.uniforms.alpha = this.alpha;

        filterManager.applyFilter(this, input, output, clear);
    }
}
