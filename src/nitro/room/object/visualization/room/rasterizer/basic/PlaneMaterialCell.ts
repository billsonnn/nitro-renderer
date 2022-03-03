import { Matrix, Point } from '@pixi/math';
import { NitroSprite } from '../../../../../../../core';
import { IGraphicAsset } from '../../../../../../../room/object/visualization/utils/IGraphicAsset';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Randomizer } from '../../utils';
import { PlaneTexture } from './PlaneTexture';

export class PlaneMaterialCell
{
    private _cachedSprite: NitroSprite;
    private _texture: PlaneTexture;
    private _extraItemOffsets: Point[];
    private _extraItemAssets: IGraphicAsset[];
    private _extraItemCount: number = 0;

    constructor(texture: PlaneTexture, assets: IGraphicAsset[] = null, offsetPoints: Point[] = null, limit: number = 0)
    {
        this._cachedSprite = null;
        this._texture = texture;
        this._extraItemOffsets = [];
        this._extraItemAssets = [];
        this._extraItemCount = 0;

        if(assets && assets.length && (limit > 0))
        {
            let assetIndex = 0;

            while(assetIndex < assets.length)
            {
                const graphic = assets[assetIndex];

                if(graphic) this._extraItemAssets.push(graphic);

                assetIndex++;
            }

            if(this._extraItemAssets.length)
            {
                if(offsetPoints)
                {
                    let pointIndex = 0;

                    while(pointIndex < offsetPoints.length)
                    {
                        const point = offsetPoints[pointIndex];

                        if(point) this._extraItemOffsets.push(new Point(point.x, point.y));

                        pointIndex++;
                    }
                }

                this._extraItemCount = limit;
            }
        }
    }

    public get isStatic(): boolean
    {
        return this._extraItemCount == 0;
    }

    public dispose(): void
    {
        if(this._texture)
        {
            this._texture.dispose();

            this._texture = null;
        }

        if(this._cachedSprite)
        {
            this._cachedSprite.destroy();

            this._cachedSprite = null;
        }

        this._extraItemAssets = null;
        this._extraItemOffsets = null;
        this._extraItemCount = 0;
    }

    public clearCache(): void
    {
        if(this._cachedSprite)
        {
            this._cachedSprite.destroy();

            this._cachedSprite = null;
        }
    }

    public getHeight(normal: IVector3D): number
    {
        if(this._texture)
        {
            const texture = this._texture.getBitmap(normal);

            if(texture) return texture.height;
        }

        return 0;
    }

    public render(normal: IVector3D, textureOffsetX: number, textureOffsetY: number): NitroSprite
    {
        if(!this._texture) return null;

        const texture = this._texture.getBitmap(normal);

        if(!texture) return null;

        const bitmap = new NitroSprite(texture);

        if((textureOffsetX !== 0) || (textureOffsetY !== 0))
        {
            while(textureOffsetX < 0) textureOffsetX += texture.width;

            while(textureOffsetY < 0) textureOffsetY += texture.height;

            bitmap.x = (textureOffsetX % texture.width);
            bitmap.y = (textureOffsetY % texture.height);

            if(textureOffsetX)
            {
                bitmap.anchor.x = 1;
                bitmap.scale.x = -1;
            }

            if(textureOffsetY)
            {
                bitmap.anchor.y = 1;
                bitmap.scale.y = -1;
            }
        }

        if(bitmap)
        {
            if(!this.isStatic)
            {
                if(this._cachedSprite)
                {
                    if((this._cachedSprite.width !== bitmap.width) || (this._cachedSprite.height !== bitmap.height))
                    {
                        this._cachedSprite.destroy();

                        this._cachedSprite = null;
                    }
                }

                if(!this._cachedSprite)
                {
                    this._cachedSprite = new NitroSprite(texture);
                }

                const limitMin = Math.min(this._extraItemCount, this._extraItemOffsets.length);
                const limitMax = Math.max(this._extraItemCount, this._extraItemOffsets.length);
                const offsetIndexes = Randomizer.getArray(this._extraItemCount, limitMax);

                let i = 0;

                while(i < limitMin)
                {
                    const offset = this._extraItemOffsets[offsetIndexes[i]];
                    const item = this._extraItemAssets[(i % this._extraItemAssets.length)];

                    if(offset && item)
                    {
                        const assetTexture = item.texture;

                        if(assetTexture)
                        {
                            const offsetFinal = new Point((offset.x + item.offsetX), (offset.y + item.offsetY));
                            const flipMatrix = new Matrix();

                            let x = 1;
                            let y = 1;
                            let translateX = 0;
                            let translateY = 0;

                            if(item.flipH)
                            {
                                x = -1;
                                translateX = assetTexture.width;
                            }

                            if(item.flipV)
                            {
                                y = -1;
                                translateY = assetTexture.height;
                            }

                            let offsetX = (offsetFinal.x + translateX);
                            offsetX = ((offsetX >> 1) << 1);

                            flipMatrix.scale(x, y);
                            flipMatrix.translate(offsetX, (offsetFinal.y + translateY));

                            const sprite = new NitroSprite(assetTexture);

                            sprite.transform.setFromMatrix(flipMatrix);

                            sprite.x = flipMatrix.tx;
                            sprite.y = flipMatrix.ty;

                            this._cachedSprite.addChild(sprite);
                        }
                    }

                    i++;
                }

                return this._cachedSprite;
            }

            return bitmap;
        }

        return null;
    }

    public getAssetName(normal:IVector3D): string
    {
        return (this._texture == null) ? null : this._texture.getAssetName(normal);
    }
}
