import { Resource, Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Matrix } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { PixiApplicationProxy, TextureUtils } from '../../pixi-proxy';

export class Rasterizer
{
    // public static line(k:BitmapData, _arg_2: Point, _arg_3: Point, _arg_4: number): void
    // {
    //     var _local_5: number;
    //     var _local_6: number;
    //     var _local_7: number;
    //     var _local_8: number;
    //     var _local_9: number;
    //     var _local_10: number;
    //     var _local_11: number = _arg_2.x;
    //     var _local_12: number = _arg_2.y;
    //     _local_5 = (_arg_3.x - _arg_2.x);
    //     _local_6 = (_arg_3.y - _arg_2.y);
    //     _local_8 = ((_local_5 > 0) ? 1 : -1);
    //     _local_9 = ((_local_6 > 0) ? 1 : -1);
    //     _local_5 = Math.abs(_local_5);
    //     _local_6 = Math.abs(_local_6);
    //     k.lock();
    //     k.setPixel32(_local_11, _local_12, _arg_4);
    //     if (((_local_5 == 0) && (_local_6 == 0)))
    //     {
    //         return;
    //     }
    //     if (_local_5 > _local_6)
    //     {
    //         _local_7 = (_local_5 - 1);
    //         while (_local_7 >= 0)
    //         {
    //             _local_10 = (_local_10 + _local_6);
    //             _local_11 = (_local_11 + _local_8);
    //             if (_local_10 >= (_local_5 / 2))
    //             {
    //                 _local_10 = (_local_10 - _local_5);
    //                 _local_12 = (_local_12 + _local_9);
    //             }
    //             k.setPixel32(_local_11, _local_12, _arg_4);
    //             _local_7--;
    //         }
    //     }
    //     else
    //     {
    //         _local_7 = (_local_6 - 1);
    //         while (_local_7 >= 0)
    //         {
    //             _local_10 = (_local_10 + _local_5);
    //             _local_12 = (_local_12 + _local_9);
    //             if (_local_10 >= (_local_6 / 2))
    //             {
    //                 _local_10 = (_local_10 - _local_6);
    //                 _local_11 = (_local_11 + _local_8);
    //             }
    //             k.setPixel32(_local_11, _local_12, _arg_4);
    //             _local_7--;
    //         }
    //     }
    //     k.setPixel32(_arg_3.x, _arg_3.y, _arg_4);
    //     k.unlock();
    // }

    public static getFlipHBitmapData(k: Texture<Resource>): Texture<Resource>
    {
        if(!k) return null;

        const renderTexture = TextureUtils.createRenderTexture(k.width, k.height);

        const matrix = new Matrix();

        matrix.scale(-1, 1);
        matrix.translate(k.width, 0);

        PixiApplicationProxy.instance.renderer.render(new Sprite(k), {
            renderTexture,
            clear: true,
            transform: matrix
        });

        return renderTexture;
    }

    public static getFlipVBitmapData(k: Texture<Resource>): Texture<Resource>
    {
        if(!k) return null;

        const matrix = new Matrix();

        matrix.scale(1, -1);
        matrix.translate(0, k.height);

        const graphic = new Graphics();

        graphic
            .beginTextureFill({
                texture: k,
                matrix
            })
            .drawRect(0, 0, k.width, k.height)
            .endFill();

        return TextureUtils.generateTexture(graphic);
    }

    public static getFlipHVBitmapData(k: Texture<Resource>): Texture<Resource>
    {
        if(!k) return null;

        const matrix = new Matrix();

        matrix.scale(-1, -1);
        matrix.translate(k.width, k.height);

        const graphic = new Graphics();

        graphic
            .beginTextureFill({
                texture: k,
                matrix
            })
            .drawRect(0, 0, k.width, k.height)
            .endFill();

        return TextureUtils.generateTexture(graphic);
    }
}
