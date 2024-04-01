import { BufferImageSource, Filter, FilterSystem, GlProgram, RenderSurface, Texture } from 'pixi.js';
import { TextureUtils } from '../TextureUtils';

export interface PaletteMapFilterOptions
{
    palette: number[];
    channel: number;
}

export class PaletteMapFilter extends Filter
{
    public static readonly CHANNEL_RED = 0;
    public static readonly CHANNEL_GREEN = 1;
    public static readonly CHANNEL_BLUE = 2;
    public static readonly CHANNEL_ALPHA = 3;

    public static readonly DEFAULT_OPTIONS: PaletteMapFilterOptions = {
        palette: [],
        channel: PaletteMapFilter.CHANNEL_RED,
    };

    public uniforms: {
        uPalette: Float32Array,
        uChannel: Float32Array
    };

    constructor(options: PaletteMapFilterOptions)
    {
        options = { ...PaletteMapFilter.DEFAULT_OPTIONS, ...options };

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
            uniform sampler2D uLutTexture;
            uniform int channel;

            void main(void) {
                vec4 currentColor = texture(uTexture, vTextureCoord);
                vec4 adjusted = currentColor;

                if(currentColor.a > 0.0)
                {
                    if(channel == 0)
                    {
                        adjusted = texture2D(uLutTexture, vec2((currentColor.r * 255.0 + 0.5) / 256.0, 0.5));
                    } else if(channel == 1) {
                        adjusted = texture2D(uLutTexture, vec2((currentColor.g * 255.0 + 0.5) / 256.0, 0.5));
                    } else if(channel == 2) {
                        adjusted = texture2D(uLutTexture, vec2((currentColor.b * 255.0 + 0.5) / 256.0, 0.5));
                    } else if(channel == 3) {
                        adjusted = texture2D(uLutTexture, vec2((currentColor.a * 255.0 + 0.5) / 256.0, 0.5));
                    }
                }

                finalColor = vec4(adjusted.r, adjusted.g, adjusted.b, currentColor.a);
            }
            `,
            name: 'palette-map-filter',
        });

        const lookUpTable = PaletteMapFilter.getLookUpTable(options.palette);

        const lutTexture = new Texture({
            source: new BufferImageSource({
                resource: Uint8Array.from(lookUpTable),
                width: lookUpTable.length / 4,
                height: 1
            })
        });

        (async () =>
        {
            console.log(await TextureUtils.generateImageUrl(lutTexture));
        })();

        super({
            gpuProgram: null,
            glProgram,
            resources: {
                paletteMapUniforms: {
                    uChannel: { value: options.channel, type: 'int' }
                },
                uLutTexture: lutTexture.source
            },
        });

        this.uniforms = this.resources.paletteMapUniforms.uniforms;

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

    private static getLookUpTable(data: number[]): number[]
    {
        const lookUpTable = [];

        for(let i = 0; i < data.length; i++)
        {
            lookUpTable[(i * 4) + PaletteMapFilter.CHANNEL_RED] = ((data[i] >> 16) & 0xFF);
            lookUpTable[(i * 4) + PaletteMapFilter.CHANNEL_GREEN] = ((data[i] >> 8) & 0xFF);
            lookUpTable[(i * 4) + PaletteMapFilter.CHANNEL_BLUE] = (data[i] & 0xFF);
            lookUpTable[(i * 4) + PaletteMapFilter.CHANNEL_ALPHA] = ((data[i] >> 24) & 0xFF);
        }

        return lookUpTable;
    }
}
