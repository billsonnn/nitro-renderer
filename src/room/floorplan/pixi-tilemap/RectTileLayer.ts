import { Bounds, Container, DRAW_MODES, groupD8, Matrix, Rectangle, Renderer, Texture } from 'pixi.js';
import { Constant } from './Constant';
import { RectTileGeom } from './RectTileShader';
import { TileRenderer } from './TileRenderer';

enum PointStruct {
    U = 0,
    V,
    X,
    Y,
    TileWidth,
    TileHeight,
    Rotate,
    AnimX,
    AnimY,
    TextureIndex,
    AnimCountX,
    AnimCountY,
    Alpha,
    YAxis,
    XAxis
}
export const POINT_STRUCT_SIZE_TWO = (Object.keys(PointStruct).length / 2);
//export const POINT_STRUCT_SIZE = 12;
export class RectTileLayer extends Container
{
    constructor(zIndex: number, texture: Texture | Array<Texture>)
    {
        super();
        this.initialize(zIndex, texture);
    }

    //zIndex = 0;
    modificationMarker = 0;
    _$_localBounds = new Bounds();
    shadowColor = new Float32Array([0.0, 0.0, 0.0, 0.5]);
    _globalMat: Matrix = null;

    pointsBuf: Array<number> = [];
    hasAnim = false;
    textures: Array<Texture>;

    offsetX = 0;
    offsetY = 0;
    compositeParent = false;

    initialize(zIndex: number, textures: Texture | Array<Texture>)
    {
        if(!textures)
        {
            textures = [];
        }
        else if(!(textures instanceof Array) && (textures as Texture).baseTexture)
        {
            textures = [textures as Texture];
        }
        this.textures = textures as Array<Texture>;
        this.zIndex = zIndex;
        // this.visible = false;
    }

    clear()
    {
        this.pointsBuf.length = 0;
        this.modificationMarker = 0;
        this._$_localBounds.clear();
        this.hasAnim = false;
    }

    addFrame(texture_: Texture | string | number, x: number, y: number, animX: number, animY: number)
    {
        let texture: Texture;
        let textureIndex = 0;

        if(typeof texture_ === 'number')
        {
            textureIndex = texture_;
            texture = this.textures[textureIndex];
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

            let found = false;
            const textureList = this.textures;
            for(let i = 0; i < textureList.length; i++)
            {
                if(textureList[i].baseTexture === texture.baseTexture)
                {
                    textureIndex = i;
                    found = true;
                    break;
                }
            }

            if(!found)
            {
                // textureIndex = this.textures.length;
                // this.textures.push(texture);
                return false;
            }
        }

        this.addRect(textureIndex, texture.frame.x, texture.frame.y, x, y, texture.orig.width, texture.orig.height, animX, animY, texture.rotate);
        return true;
    }

    addRect(textureIndex: number, u: number, v: number, x: number, y: number, tileWidth: number, tileHeight: number,
        animX: number = 0, animY: number = 0, rotate: number = 0, animCountX: number = 1024, animCountY: number = 1024, alpha: number = 1, yaxis?: number, xaxis?: number): this
    {
        const pb = this.pointsBuf;
        this.hasAnim = this.hasAnim || animX > 0 || animY > 0;
        pb.push(u);
        pb.push(v);
        pb.push(x);
        pb.push(y);
        pb.push(tileWidth);
        pb.push(tileHeight);
        pb.push(rotate);
        pb.push(animX | 0);
        pb.push(animY | 0);
        pb.push(textureIndex);
        pb.push(animCountX);
        pb.push(animCountY);
        pb.push(alpha);
        pb.push(yaxis);
        pb.push(xaxis);

        this._$_localBounds.addFramePad(x, y, x+tileWidth, y+tileHeight, 0, 0);

        return this;
    }

    tileRotate(rotate: number)
    {
        const pb = this.pointsBuf;
        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.TextureIndex)] = rotate;
    }

    tileAnimX(offset: number, count: number)
    {
        const pb = this.pointsBuf;

        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.AnimX)] = offset;
        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.AnimCountX)] = count;
    }

    tileAnimY(offset: number, count: number)
    {
        const pb = this.pointsBuf;

        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.AnimY)] = offset;
        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.AnimCountY)] = count;
    }

    tileAlpha(alpha: number)
    {
        const pb = this.pointsBuf;
        pb[pb.length - (POINT_STRUCT_SIZE_TWO - PointStruct.Alpha)] = alpha;
    }

    renderCanvas(renderer: any)
    {
        const plugin = renderer.plugins.tilemap;
        if(!plugin.dontUseTransform)
        {
            const wt = this.worldTransform;
            renderer.context.setTransform(
                wt.a,
                wt.b,
                wt.c,
                wt.d,
                wt.tx * renderer.resolution,
                wt.ty * renderer.resolution
            );
        }
        this.renderCanvasCore(renderer);
    }

    renderCanvasCore(renderer: any)
    {
        if(this.textures.length === 0) return;
        const points = this.pointsBuf;
        renderer.context.fillStyle = '#000000';
        for(let i = 0, n = points.length; i < n; i += POINT_STRUCT_SIZE_TWO)
        {
            let x1 = points[i + PointStruct.U], y1 = points[i + PointStruct.V];
            const x2 = points[i + PointStruct.X], y2 = points[i + PointStruct.Y];
            const w = points[i + PointStruct.TileWidth];
            const h = points[i + PointStruct.TileHeight];
            const rotate = points[i + PointStruct.Rotate];
            x1 += points[i + PointStruct.AnimX] * renderer.plugins.tilemap.tileAnim[0];
            y1 += points[i + PointStruct.AnimY] * renderer.plugins.tilemap.tileAnim[1];
            const textureIndex = points[i + PointStruct.TextureIndex];
            const alpha = points[i + PointStruct.Alpha];
            // canvas does not work with rotate yet
            if(textureIndex >= 0)
            {
                renderer.context.globalAlpha = alpha;
                renderer.context.drawImage((this.textures[textureIndex].baseTexture as any).getDrawableSource(), x1, y1, w, h, x2, y2, w, h);
            }
            else
            {
                renderer.context.globalAlpha = 0.5;
                renderer.context.fillRect(x2, y2, w, h);
                renderer.context.globalAlpha = 1;
            }
            renderer.context.globalAlpha = 1;
        }
    }

    vbId = 0;
    vb: RectTileGeom = null;
    vbBuffer: ArrayBuffer = null;
    vbArray: Float32Array = null;
    vbInts: Uint32Array = null;

    destroyVb()
    {
        if(this.vb)
        {
            this.vb.destroy();
            this.vb = null;
        }
    }

    render(renderer: Renderer)
    {
        const plugin = (renderer.plugins as any)['tilemap'];
        const shader = plugin.getShader();
        renderer.batch.setObjectRenderer(plugin);
        this._globalMat = shader.uniforms.projTransMatrix;
        renderer.globalUniforms.uniforms.projectionMatrix.copyTo(this._globalMat).append(this.worldTransform);
        shader.uniforms.shadowColor = this.shadowColor;
        shader.uniforms.animationFrame = plugin.tileAnim;
        this.renderWebGLCore(renderer, plugin);
    }

    renderWebGLCore(renderer: Renderer, plugin: TileRenderer)
    {
        const points = this.pointsBuf;
        if(points.length === 0) return;
        const rectsCount = points.length / POINT_STRUCT_SIZE_TWO;

        const shader = plugin.getShader();
        const textures = this.textures;
        if(textures.length === 0) return;

        plugin.bindTextures(renderer, shader, textures);
        renderer.shader.bind(shader, false);

        //lost context! recover!
        let vb = this.vb;
        if(!vb)
        {
            vb = plugin.createVb();
            this.vb = vb;
            this.vbId = (vb as any).id;
            this.vbBuffer = null;
            this.modificationMarker = 0;
        }

        plugin.checkIndexBuffer(rectsCount, vb);
        const boundCountPerBuffer = Constant.boundCountPerBuffer;

        const vertexBuf = vb.getBuffer('aVertexPosition');
        //if layer was changed, re-upload vertices
        const vertices = rectsCount * vb.vertPerQuad;
        if(vertices === 0) return;
        if(this.modificationMarker !== vertices)
        {
            this.modificationMarker = vertices;
            const vs = vb.stride * vertices;
            if(!this.vbBuffer || this.vbBuffer.byteLength < vs)
            {
                //!@#$ happens, need resize
                let bk = vb.stride;
                while(bk < vs)
                {
                    bk *= 2;
                }
                this.vbBuffer = new ArrayBuffer(bk);
                this.vbArray = new Float32Array(this.vbBuffer);
                this.vbInts = new Uint32Array(this.vbBuffer);
                vertexBuf.update(this.vbBuffer);
            }

            const arr = this.vbArray, ints = this.vbInts;
            //upload vertices!
            let sz = 0;
            //let tint = 0xffffffff;
            let textureId = 0;
            let shiftU: number = this.offsetX;
            let shiftV: number = this.offsetY;

            //let tint = 0xffffffff;
            const tint = -1;


            for(let i = 0; i < points.length; i += POINT_STRUCT_SIZE_TWO)
            {
                const eps = 0.5;
                if(this.compositeParent)
                {
                    const textureIndex = points[i + PointStruct.TextureIndex];
                    if(boundCountPerBuffer > 1)
                    {
                        //TODO: what if its more than 4?
                        textureId = (textureIndex >> 2);
                        shiftU = this.offsetX * (textureIndex & 1);
                        shiftV = this.offsetY * ((textureIndex >> 1) & 1);
                    }
                    else
                    {
                        textureId = textureIndex;
                        shiftU = 0;
                        shiftV = 0;
                    }
                }
                const x = points[i + PointStruct.X], y = points[i + PointStruct.Y];
                const w = points[i + PointStruct.TileWidth], h = points[i + PointStruct.TileHeight];
                const u = points[i + PointStruct.U] + shiftU, v = points[i + PointStruct.V] + shiftV;
                let rotate = points[i + PointStruct.Rotate];

                const animX = points[i + PointStruct.AnimX], animY = points[i + PointStruct.AnimY];
                const animWidth = points[i + PointStruct.AnimCountX] || 1024, animHeight = points[i + PointStruct.AnimCountY] || 1024;
                const animXEncoded = animX + (animWidth * 2048);
                const animYEncoded = animY + (animHeight * 2048);
                const alpha = points[i + PointStruct.Alpha];

                let u0: number, v0: number, u1: number, v1: number, u2: number, v2: number, u3: number, v3: number;
                if(rotate === 0)
                {
                    u0 = u;
                    v0 = v;
                    u1 = u + w;
                    v1 = v;
                    u2 = u + w;
                    v2 = v + h;
                    u3 = u;
                    v3 = v + h;
                }
                else
                {
                    let w2 = w / 2;
                    let h2 = h / 2;
                    if(rotate % 4 !== 0)
                    {
                        w2 = h / 2;
                        h2 = w / 2;
                    }
                    const cX = u + w2;
                    const cY = v + h2;

                    rotate = groupD8.add(rotate, groupD8.NW);
                    u0 = cX + (w2 * groupD8.uX(rotate));
                    v0 = cY + (h2 * groupD8.uY(rotate));

                    rotate = groupD8.add(rotate, 2); // rotate 90 degrees clockwise
                    u1 = cX + (w2 * groupD8.uX(rotate));
                    v1 = cY + (h2 * groupD8.uY(rotate));

                    rotate = groupD8.add(rotate, 2);
                    u2 = cX + (w2 * groupD8.uX(rotate));
                    v2 = cY + (h2 * groupD8.uY(rotate));

                    rotate = groupD8.add(rotate, 2);
                    u3 = cX + (w2 * groupD8.uX(rotate));
                    v3 = cY + (h2 * groupD8.uY(rotate));
                }

                const test=  true;
                arr[sz++] = x;
                arr[sz++] = y;
                arr[sz++] = u0;
                arr[sz++] = v0;
                arr[sz++] = u + eps;
                arr[sz++] = v + eps;
                arr[sz++] = u + w - eps;
                arr[sz++] = v + h - eps;
                arr[sz++] = animXEncoded;
                arr[sz++] = animYEncoded;
                arr[sz++] = textureId;

                if(test)
                {
                    arr[sz++] = alpha;
                }
                arr[sz++] = x + w;
                arr[sz++] = y;
                arr[sz++] = u1;
                arr[sz++] = v1;
                arr[sz++] = u + eps;
                arr[sz++] = v + eps;
                arr[sz++] = u + w - eps;
                arr[sz++] = v + h - eps;
                arr[sz++] = animXEncoded;
                arr[sz++] = animYEncoded;
                arr[sz++] = textureId;
                if(test)
                {
                    arr[sz++] = alpha;
                }


                arr[sz++] = x + w;
                arr[sz++] = y + h;
                arr[sz++] = u2;
                arr[sz++] = v2;
                arr[sz++] = u + eps;
                arr[sz++] = v + eps;
                arr[sz++] = u + w - eps;
                arr[sz++] = v + h - eps;
                arr[sz++] = animXEncoded;
                arr[sz++] = animYEncoded;
                arr[sz++] = textureId;
                if(test)
                {
                    arr[sz++] = alpha;
                }

                arr[sz++] = x;
                arr[sz++] = y + h;
                arr[sz++] = u3;
                arr[sz++] = v3;
                arr[sz++] = u + eps;
                arr[sz++] = v + eps;
                arr[sz++] = u + w - eps;
                arr[sz++] = v + h - eps;
                arr[sz++] = animXEncoded;
                arr[sz++] = animYEncoded;
                arr[sz++] = textureId;
                if(test)
                {
                    arr[sz++] = alpha;
                }
            }

            vertexBuf.update(arr);
        }

        (renderer.geometry as any).bind(vb, shader);
        renderer.geometry.draw(DRAW_MODES.TRIANGLES, rectsCount * 6, 0);
    }

    isModified(anim: boolean)
    {
        if(this.modificationMarker !== this.pointsBuf.length ||
            anim && this.hasAnim)
        {
            return true;
        }
        return false;
    }

    clearModify()
    {
        this.modificationMarker = this.pointsBuf.length;
    }

    protected _calculateBounds(): void
    {
        const { minX, minY, maxX, maxY } = this._$_localBounds;

        this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
    }

    public getLocalBounds(rect?: Rectangle): Rectangle
    {
        // we can do a fast local bounds if the sprite has no children!
        if(this.children.length === 0)
        {
            return this._$_localBounds.getRectangle(rect);
        }

        return super.getLocalBounds.call(this, rect);
    }

    destroy(options?: any)
    {
        super.destroy(options);
        this.destroyVb();
    }
}
