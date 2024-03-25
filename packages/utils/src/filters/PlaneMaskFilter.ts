import { Filter, FilterSystem, GlProgram, RenderSurface, Texture } from 'pixi.js';

export interface PlaneMaskFilterOptions
{
}

export class PlaneMaskFilter extends Filter
{
    public static readonly DEFAULT_OPTIONS: PlaneMaskFilterOptions = {
    };

    public uniforms: {
    };

    constructor(options: PlaneMaskFilterOptions)
    {
        options = { ...PlaneMaskFilter.DEFAULT_OPTIONS, ...options };

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

            void main(void) {
                vec4 c = texture(uTexture, vTextureCoord);

                if(c.r == 0.0 && c.g == 0.0 && c.b == 0.0) {
                    finalColor = vec4(0.0, 0.0, 0.0, 0.0);
                } else {
                    finalColor = c;
                }
            }
            `,
            name: 'plane-mask-filter',
        });

        super({
            gpuProgram: null,
            glProgram,
            resources: {
                planeMaskUniforms: {
                },
            },
        });

        this.uniforms = this.resources.planeMaskUniforms.uniforms;

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
}
