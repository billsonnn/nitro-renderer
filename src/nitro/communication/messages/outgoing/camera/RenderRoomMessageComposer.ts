import { RenderTexture } from '@pixi/core';
import { IMessageComposer } from '../../../../../api';
import { TextureUtils } from '../../../../../pixi-proxy';

export class RenderRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof RenderRoomMessageComposer>>
{
    private _data: any;

    constructor(k: any = '', _arg_2: string = '', _arg_3: string = '', _arg_4: number = -1, _arg_5: number = -1)
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

    public assignBitmap(texture: RenderTexture): void
    {
        const url = TextureUtils.generateImageUrl(texture);

        if(!url) return;

        const base64Data = url.split(',')[1];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        this._data.push(binaryData.byteLength, binaryData.buffer);
    }

    public assignBase64(base64: string): void
    {
        const base64Data = base64.split(',')[1];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        this._data.push(binaryData.byteLength, binaryData.buffer);
    }
}
