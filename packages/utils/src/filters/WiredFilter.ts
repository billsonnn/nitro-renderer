import { Color, ColorSource, Filter, FilterSystem, GlProgram, RenderSurface, Texture } from 'pixi.js';

export interface WiredFilterOptions
{
    lineColor: ColorSource;
    color: ColorSource;
}

export class WiredFilter extends Filter
{
    public static readonly DEFAULT_OPTIONS: WiredFilterOptions = {
        lineColor: 0x000000,
        color: 0x000000,
    };

    public uniforms: {
        uLineColor: Float32Array,
        uColor: Float32Array
    };

    private _lineColor!: Color;
    private _color!: Color;

    constructor(options: WiredFilterOptions)
    {
        options = { ...WiredFilter.DEFAULT_OPTIONS, ...options };

        const glProgram = GlProgram.from({
            vertex: `in vec2 aPosition;
            out vec2 vTextureCoord;
            
            uniform vec4 uInputSize;
            uniform vec4 uOutputFrame;
            uniform vec4 uOutputTexture;
            
            vec4 filterVertexPosition( void )
            {
                vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
                
                position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
                position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
            
                return vec4(position, 0.0, 1.0);
            }
            
            vec2 filterTextureCoord( void )
            {
                return aPosition * (uOutputFrame.zw * uInputSize.zw);
            }
            
            void main(void)
            {
                gl_Position = filterVertexPosition();
                vTextureCoord = filterTextureCoord();
            }`,
            fragment: `
            in vec2 vTextureCoord;
            out vec4 finalColor;

            uniform sampler2D uTexture;
            uniform vec3 uLineColor;
            uniform vec3 uColor;

            void main(void) {
                vec4 currentColor = texture(uTexture, vTextureCoord);
                vec3 colorLine = uLineColor * currentColor.a;
                vec3 colorOverlay = uColor * currentColor.a;

                if(currentColor.r == 0.0 && currentColor.g == 0.0 && currentColor.b == 0.0 && currentColor.a > 0.0) {
                    finalColor = vec4(colorLine.r, colorLine.g, colorLine.b, currentColor.a);
                } else if(currentColor.a > 0.0) {
                    finalColor = vec4(colorOverlay.r, colorOverlay.g, colorOverlay.b, currentColor.a);
                }
            }
            `,
            name: 'wired-filter',
        });

        super({
            gpuProgram: null,
            glProgram,
            resources: {
                planeMaskUniforms: {
                    uLineColor: { value: new Float32Array(3), type: 'vec3<f32>' },
                    uColor: { value: new Float32Array(3), type: 'vec3<f32>' }
                },
            },
        });

        this.uniforms = this.resources.planeMaskUniforms.uniforms;

        this._lineColor = new Color();
        this.lineColor = options.lineColor ?? 0x000000;

        this._color = new Color();
        this.color = options.color ?? 0x000000;

        Object.assign(this, options);
    }

    public apply(
        filterManager: FilterSystem,
        input: Texture,
        output: RenderSurface,
        clearMode: boolean,
    ): void
    {

        filterManager.applyFilter(this, input, output, clearMode);
    }

    public get lineColor(): ColorSource
    {
        return this._lineColor.value as ColorSource;
    }

    public set lineColor(value: ColorSource)
    {
        this._lineColor.setValue(value);

        const [r, g, b] = this._lineColor.toArray();

        this.uniforms.uLineColor[0] = r;
        this.uniforms.uLineColor[1] = g;
        this.uniforms.uLineColor[2] = b;
    }

    public get color(): ColorSource
    {
        return this._color.value as ColorSource;
    }

    public set color(value: ColorSource)
    {
        this._color.setValue(value);

        const [r, g, b] = this._color.toArray();

        this.uniforms.uColor[0] = r;
        this.uniforms.uColor[1] = g;
        this.uniforms.uColor[2] = b;
    }
}
