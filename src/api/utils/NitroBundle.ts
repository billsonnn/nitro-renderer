import { BaseTexture } from '@pixi/core';
import { Data, inflate } from 'pako';
import { ArrayBufferToBase64 } from './ArrayBufferToBase64';
import { BinaryReader } from './BinaryReader';

export class NitroBundle
{
    private static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8');

    private _jsonFile: Object = null;
    private _image: string = null;
    private _imageData: Uint8Array = null;
    private _baseTexture: BaseTexture = null;

    constructor(arrayBuffer: ArrayBuffer)
    {
        this.parse(arrayBuffer);
    }

    public parse(arrayBuffer: ArrayBuffer): void
    {
        const binaryReader = new BinaryReader(arrayBuffer);

        let fileCount = binaryReader.readShort();

        while(fileCount > 0)
        {
            const fileNameLength = binaryReader.readShort();
            const fileName = binaryReader.readBytes(fileNameLength).toString();
            const fileLength = binaryReader.readInt();
            const buffer = binaryReader.readBytes(fileLength);

            if(fileName.endsWith('.json'))
            {
                const decompressed = inflate((buffer.toArrayBuffer() as Data));

                this._jsonFile = JSON.parse(NitroBundle.TEXT_DECODER.decode(decompressed));
            }
            else
            {
                const decompressed = inflate((buffer.toArrayBuffer() as Data));
                const base64 = ArrayBufferToBase64(decompressed);

                this._baseTexture = new BaseTexture('data:image/png;base64,' + base64);
            }

            fileCount--;
        }
    }

    get jsonFile(): Object
    {
        return this._jsonFile;
    }

    public get baseTexture(): BaseTexture
    {
        return this._baseTexture;
    }
}
