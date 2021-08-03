import { Container, Matrix, Renderer, Resource, Texture } from 'pixi.js';
import { Constant } from './Constant';
import { RectTileLayer } from './RectTileLayer';

export class CompositeRectTileLayer extends Container
{
    constructor(zIndex?: number, bitmaps?: Array<Texture>, texPerChild?: number, alpha?: number)
    {
        super();
        // eslint-disable-next-line prefer-spread,prefer-rest-params
        this.initialize.apply(this, arguments);
    }

    z: number;
    modificationMarker = 0;
    shadowColor = new Float32Array([0.0, 0.0, 0.0, 0.5]);
    _globalMat: Matrix = null;
    _lastLayer: RectTileLayer = null;

    texPerChild: number;

    initialize(zIndex?: number, bitmaps?: Array<Texture>, texPerChild?: number, alpha?: number)
    {
        if(texPerChild as any === true)
        {
            //old format, ignore it!
            texPerChild = 0;
        }
        this.z = this.zIndex = zIndex;
        this.alpha = alpha ?? 1.0;
        this.texPerChild = texPerChild || Constant.boundCountPerBuffer * Constant.maxTextures;
        if(bitmaps)
        {
            this.setBitmaps(bitmaps);
        }
    }

    setBitmaps(bitmaps: Array<Texture>)
    {
        for(let i=0;i<bitmaps.length;i++)
        {
            if(bitmaps[i] && !bitmaps[i].baseTexture)
            {
                throw new Error('pixi-tilemap cannot use destroyed textures. '+
                    'Probably, you passed resources[\'myAtlas\'].texture in pixi > 5.2.1, it does not exist there.');
            }
        }
        const texPerChild = this.texPerChild;
        const len1 = this.children.length;
        const len2 = Math.ceil(bitmaps.length / texPerChild);
        let i: number;
        for(i = 0; i < len1; i++)
        {
            (this.children[i] as RectTileLayer).textures = bitmaps.slice(i * texPerChild, (i + 1) * texPerChild);
        }
        for(i = len1; i < len2; i++)
        {
            const layer = new RectTileLayer(this.zIndex, bitmaps.slice(i * texPerChild, (i + 1) * texPerChild));
            layer.compositeParent = true;
            layer.offsetX = Constant.boundSize;
            layer.offsetY = Constant.boundSize;
            this.addChild(layer);
        }
    }

    clear()
    {
        for(let i = 0; i < this.children.length; i++)
        {
            (this.children[i] as RectTileLayer).clear();
        }
        this.modificationMarker = 0;
    }

    addRect(textureIndex: number, u: number, v: number, x: number, y: number, tileWidth: number, tileHeight: number, animX?: number, animY?: number, rotate?: number, animWidth?: number, animHeight?: number, alpha?: number): this
    {
        const childIndex: number = textureIndex / this.texPerChild >> 0;
        const textureId: number = textureIndex % this.texPerChild;

        if(this.children[childIndex] && (this.children[childIndex] as RectTileLayer).textures)
        {
            this._lastLayer = (this.children[childIndex] as RectTileLayer);
            const tileAlpha = this.worldAlpha * (alpha ?? 1.0);
            this._lastLayer.addRect(textureId, u, v, x, y, tileWidth, tileHeight, animX, animY, rotate, animWidth, animHeight, tileAlpha);
        }
        else
        {
            this._lastLayer = null;
        }

        return this;
    }

    tileRotate(rotate: number): this
    {
        if(this._lastLayer)
        {
            this._lastLayer.tileRotate(rotate);
        }
        return this;
    }

    tileAnimX(offset: number, count: number): this
    {
        if(this._lastLayer)
        {
            this._lastLayer.tileAnimX(offset, count);
        }
        return this;
    }

    tileAnimY(offset: number, count: number): this
    {
        if(this._lastLayer)
        {
            this._lastLayer.tileAnimY(offset, count);
        }
        return this;
    }

    addFrame(texture_: Texture<Resource> | string | number, x: number, y: number, animX?: number, animY?: number, animWidth?: number, animHeight?: number, alpha?: number, yaxis?: number, xaxis?: number): this
    {
        let texture: Texture<Resource>;
        let layer: RectTileLayer = null;
        let ind = 0;
        const children = this.children;

        this._lastLayer = null;
        if(typeof texture_ === 'number')
        {
            const childIndex = texture_ / this.texPerChild >> 0;
            layer = children[childIndex] as RectTileLayer;

            if(!layer)
            {
                layer = children[0] as RectTileLayer;
                if(!layer)
                {
                    return this;
                }
                ind = 0;
            }
            else
            {
                ind = texture_ % this.texPerChild;
            }

            texture = layer.textures[ind];
        }
        else
        {
            if(typeof texture_ === 'string')
            {
                texture = Texture.from(texture_);
            }
            else
            {
                texture = texture_ as Texture;
            }

            for(let i = 0; i < children.length; i++)
            {
                const child = children[i] as RectTileLayer;
                const tex = child.textures;
                for(let j = 0; j < tex.length; j++)
                {
                    if(tex[j].baseTexture === texture.baseTexture)
                    {
                        layer = child;
                        ind = j;
                        break;
                    }
                }
                if(layer)
                {
                    break;
                }
            }

            if(!layer)
            {
                for(let i = 0; i < children.length; i++)
                {
                    const child = children[i] as RectTileLayer;
                    if(child.textures.length < this.texPerChild)
                    {
                        layer = child;
                        ind = child.textures.length;
                        child.textures.push(texture);
                        break;
                    }
                }
                if(!layer)
                {
                    layer = new RectTileLayer(this.zIndex, texture);
                    layer.compositeParent = true;
                    layer.offsetX = Constant.boundSize;
                    layer.offsetY = Constant.boundSize;
                    this.addChild(layer);
                    ind = 0;
                }
            }
        }

        this._lastLayer = layer;
        const tileAlpha = this.worldAlpha * (alpha?? 1.0);
        layer.addRect(ind, texture.frame.x, texture.frame.y, x, y, texture.orig.width, texture.orig.height, animX, animY, texture.rotate, animWidth, animHeight, tileAlpha, yaxis, xaxis);
        return this;
    }

    // renderCanvas(renderer: CanvasRenderer)
    // {
    //     if(!this.visible || this.worldAlpha <= 0 || !this.renderable)
    //     {
    //         return;
    //     }
    //     const plugin = renderer.plugins.tilemap;
    //     if(!plugin.dontUseTransform)
    //     {
    //         const wt = this.worldTransform;
    //         renderer.context.setTransform(
    //             wt.a,
    //             wt.b,
    //             wt.c,
    //             wt.d,
    //             wt.tx * renderer.resolution,
    //             wt.ty * renderer.resolution
    //         );
    //     }
    //     const layers = this.children;
    //     for(let i = 0; i < layers.length; i++)
    //     {
    //         (layers[i] as RectTileLayer).renderCanvasCore(renderer);
    //     }
    // }

    render(renderer: Renderer)
    {
        if(!this.visible || this.worldAlpha <= 0 || !this.renderable)
        {
            return;
        }
        const plugin = (renderer.plugins as any)['tilemap'];
        const shader = plugin.getShader();
        renderer.batch.setObjectRenderer(plugin);
        //TODO: dont create new array, please
        this._globalMat = shader.uniforms.projTransMatrix;
        renderer.globalUniforms.uniforms.projectionMatrix.copyTo(this._globalMat).append(this.worldTransform);
        shader.uniforms.shadowColor = this.shadowColor;
        shader.uniforms.animationFrame = plugin.tileAnim;
        renderer.shader.bind(shader, false);
        const layers = this.children;
        for(let i = 0; i < layers.length; i++)
        {
            (layers[i] as RectTileLayer).renderWebGLCore(renderer, plugin);
        }
    }

    isModified(anim: boolean)
    {
        const layers = this.children;
        if(this.modificationMarker !== layers.length)
        {
            return true;
        }
        for(let i = 0; i < layers.length; i++)
        {
            if((layers[i] as RectTileLayer).isModified(anim))
            {
                return true;
            }
        }
        return false;
    }

    clearModify()
    {
        const layers = this.children;
        this.modificationMarker = layers.length;
        for(let i = 0; i < layers.length; i++)
        {
            (layers[i] as RectTileLayer).clearModify();
        }
    }
}
