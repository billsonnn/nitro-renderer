import { Graphics } from '@pixi/graphics';
import { Matrix } from '@pixi/math';
import { IDisposable } from '../../../../../../../core/common/disposable/IDisposable';
import { IGraphicAssetCollection } from '../../../../../../../room/object/visualization/utils/IGraphicAssetCollection';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { AnimationItem } from './AnimationItem';

export class PlaneVisualizationAnimationLayer implements IDisposable
{
    private _color: number = 0;
    private _bitmapData: Graphics = null;
    private _isDisposed: boolean = false;
    private _items: AnimationItem[];

    constructor(k: any, _arg_2: IGraphicAssetCollection)
    {
        this._color = 0;
        this._bitmapData = null;
        this._isDisposed = false;
        this._items = [];

        if(k && _arg_2)
        {
            for(const item of k)
            {
                if(!item) continue;

                const assetName = item.asset;

                if(assetName)
                {
                    const asset = _arg_2.getAsset(assetName);

                    if(asset) this._items.push(new AnimationItem(item.x, item.y, item.speedX, item.speedY, asset));
                }
            }
        }
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    public dispose(): void
    {
        this._isDisposed = true;

        if(this._bitmapData)
        {
            this._bitmapData.destroy();

            this._bitmapData = null;
        }

        if(this._items)
        {
            for(const item of this._items) item && item.dispose();

            this._items = [];
        }
    }

    public clearCache(): void
    {
        if(this._bitmapData)
        {
            this._bitmapData.destroy();

            this._bitmapData = null;
        }
    }

    public render(canvas: Graphics, width: number, height: number, normal: IVector3D, offsetX: number, offsetY: number, maxX: number, maxY: number, dimensionX: number, dimensionY: number, timeSinceStartMs: number): Graphics
    {
        if((((canvas == null) || (!(canvas.width == width))) || (!(canvas.height == height))))
        {
            if((((this._bitmapData == null) || (!(this._bitmapData.width == width))) || (!(this._bitmapData.height == height))))
            {
                if(this._bitmapData != null)
                {
                    this._bitmapData.destroy();
                }

                this._bitmapData = new Graphics()
                    .drawRect(0, 0, width, height);
            }
            else
            {
                this._bitmapData
                    .beginFill(0xFFFFFF)
                    .drawRect(0, 0, this._bitmapData.width, this._bitmapData.height)
                    .endFill();
                //this._bitmapData.fillRect(this._bitmapData.rect, 0xFFFFFF);
            }

            canvas = this._bitmapData;
        }

        if(((maxX > 0) && (maxY > 0)))
        {
            let _local_12 = 0;

            while(_local_12 < this._items.length)
            {
                const _local_13 = (this._items[_local_12] as AnimationItem);
                if(_local_13 != null)
                {
                    const _local_14 = _local_13.getPosition(maxX, maxY, dimensionX, dimensionY, timeSinceStartMs);

                    _local_14.x = (_local_14.x - offsetX);
                    _local_14.y = (_local_14.y - offsetY);

                    if(_local_13.bitmapData)
                    {
                        if(_local_14.x > 0 && (_local_14.x + _local_13.bitmapData.width < canvas.width))
                        {
                            canvas
                                .beginFill(0x00FF00)
                                .beginTextureFill({ texture: _local_13.bitmapData.texture, matrix: new Matrix(1, 0, 0, 1, _local_14.x, _local_14.y) })
                                .drawRect(_local_14.x, _local_14.y, _local_13.bitmapData.width, _local_13.bitmapData.height)
                                .endFill();
                        }
                        else if(_local_14.x > 0)
                        {
                            const difference = canvas.width - _local_14.x;
                            canvas
                                .beginFill(0x00FF00)
                                .beginTextureFill({ texture: _local_13.bitmapData.texture, matrix: new Matrix(1, 0, 0, 1, _local_14.x, _local_14.y) })
                                .drawRect(_local_14.x, _local_14.y, difference, _local_13.bitmapData.height)
                                .endFill();
                        }
                        else
                        {
                            //if(_local_14.x > -_local_13.bitmapData.width) 
                            const difference = _local_13.bitmapData.width + _local_14.x;
                            canvas
                                .beginFill(0x00FF00)
                                .beginTextureFill({ texture: _local_13.bitmapData.texture, matrix: new Matrix(1, 0, 0, 1, _local_14.x, _local_14.y) })
                                .drawRect(0, _local_14.y, difference, _local_13.bitmapData.height)
                                .endFill();
                        }
                    }
                }

                _local_12++;
            }
        }

        return canvas;
    }
}
