import { RenderTexture } from 'pixi.js';
import { Byte } from '../../../../../core';
import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';
import { TextureUtils } from '../../../../../room';

export class RenderRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof RenderRoomMessageComposer>>
{
    private _data: any;

    constructor(k:any = '', _arg_2: string = '', _arg_3: string = '', _arg_4: number = -1, _arg_5: number = -1)
    {
        this._data = [];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        this._data = [];
    }

    public assignBitmap(texture: RenderTexture):void
    {
        const url = TextureUtils.generateImageUrl(texture);

        if(!url) return;

        const data = url.split(',')[1];
        const codes: Byte[] = [];

        for(let i = 0; i < data.length; i++) codes.push(new Byte(data.charCodeAt(i)));

        this._data.push(codes.length, ...codes);
    }
}
