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

        const base64Data = url.split(',')[1];
        const binaryData = atob(base64Data);

        const codes: Byte[] = [];

        for(let i = 0; i < binaryData.length; i++) codes.push(new Byte(binaryData.charCodeAt(i)));

        this._data.push(codes.length, ...codes);
    }
}
