import { Filter, FilterSystem, GlProgram, RenderSurface, Texture } from 'pixi.js';

export interface CutTransparentAreaFilterOptions
{
    maskTexture: Texture;
}

export class CutMaskFilter extends Filter
{
    public static readonly DEFAULT_OPTIONS: CutTransparentAreaFilterOptions = {
        maskTexture: Texture.WHITE,
    };

    public uniforms: {
        uColor: Float32Array;
        uAlpha: number;
        uDimensions: Float32Array;
    };

    constructor(options: CutTransparentAreaFilterOptions)
    {
        options = { ...CutMaskFilter.DEFAULT_OPTIONS, ...options };

        if(!options.maskTexture) throw Error('No texture provided for mask filter');

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
            fragment: `varying vec2 vTextureCoord;

            uniform sampler2D uSampler; // The sprite's texture
            uniform sampler2D maskTexture; // The mask texture
            
            void main(void) {
                vec4 spriteColor = texture2D(uSampler, vTextureCoord);
                vec4 maskColor = texture2D(maskTexture, vTextureCoord);
                
                // Use mask alpha to determine the transparency
                float alpha = maskColor.a;
                
                // Apply the mask based on its alpha value
                // You can modify this logic to suit your masking criteria
                gl_FragColor = vec4(spriteColor.rgb, spriteColor.a * (1.0 - alpha));
            }`,
            name: 'cut-mask-filter',
        });

        super({
            gpuProgram: null,
            glProgram,
            resources: {
                maskTexture: options.maskTexture
            },
        });

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
