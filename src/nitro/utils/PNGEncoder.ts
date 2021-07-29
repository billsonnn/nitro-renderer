import { RenderTexture } from '@pixi/core';
import { BinaryWriter } from '../../core/communication/codec/BinaryWriter';
import { TextureUtils } from '../../room';

export class PNGEncoder
{
    private static crcTable: number[];
    private static crcTableComputed: boolean = false;

    public static encode(texture: RenderTexture): ArrayBuffer
    {
        if(!texture) return null;

        const canvas = TextureUtils.generateCanvas(texture);

        if(!canvas) return null;

        const width     = canvas.width;
        const height    = canvas.height;
        const context   = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, width, height);

        const writer1 = new BinaryWriter();
        writer1.writeInt(2303741511);
        writer1.writeInt(218765834);

        const writer2 = new BinaryWriter();
        writer2.writeInt(width);
        writer2.writeInt(height);
        writer2.writeInt(134610944);
        writer2.writeByte(0);

        PNGEncoder.writeChunk(writer1, 1229472850, writer2);

        const writer3 = new BinaryWriter();

        let _local_5 = 0;

        while(_local_5 < texture.height)
        {
            writer3.writeByte(0);

            let _local_7 = 0;

            while(_local_7 < texture.width)
            {
                const _local_6 = PNGEncoder.getPixel(imageData, _local_7, _local_5);

                writer3.writeInt((((_local_6 & 0xFFFFFF) << 8) | 0xFF));

                _local_7++;
            }

            _local_5++;
        }

        PNGEncoder.writeChunk(writer1, 1229209940, writer3);
        PNGEncoder.writeChunk(writer1, 1229278788, null);

        return writer1.getBuffer();
    }

    private static getPixel(imageData: ImageData, x: number, y: number): number
    {
        const r = imageData.data[ ((y*(imageData.width*4)) + (x*4)) + 0 ];
        const g = imageData.data[ ((y*(imageData.width*4)) + (x*4)) + 1 ];
        const b = imageData.data[ ((y*(imageData.width*4)) + (x*4)) + 2 ];
        const a = imageData.data[ ((y*(imageData.width*4)) + (x*4)) + 3 ];

        return (r << 16 | g << 8 | b | a << 24);
    }

    private static writeChunk(writer1: BinaryWriter, _arg_2: number, writer2: BinaryWriter):void
    {
        if(!PNGEncoder.crcTableComputed)
        {
            PNGEncoder.crcTableComputed = true;
            PNGEncoder.crcTable = [];

            let _local_9 = 0;

            while(_local_9 < 0x0100)
            {
                let _local_8 = _local_9;
                let _local_10 = 0;

                while(_local_10 < 8)
                {
                    if((_local_8 & 0x01))
                    {
                        _local_8 = (3988292384 ^ (_local_8 >>> 1));
                    }
                    else
                    {
                        _local_8 = (_local_8 >>> 1);
                    }

                    _local_10++;
                }

                PNGEncoder.crcTable[_local_9] = _local_8;
                _local_9++;
            }
        }

        let _local_4 = 0;

        if(writer2 !== null) _local_4 = writer2.getBuffer().byteLength;

        writer1.writeInt(_local_4);

        const _local_5: number = writer1.position;

        writer1.writeInt(_arg_2);

        if(writer2 !== null) writer1.writeBytes(writer2.getBuffer());

        const _local_6: number = writer1.position;

        writer1.position = _local_5;

        let _local_8 = 0xFFFFFFFF;

        let _local_7 = 0;

        while(_local_7 < (_local_6 - _local_5))
        {
            _local_8 = (PNGEncoder.crcTable[((_local_8 ^ writer1.getBuffer()[--writer1.position]) & 0xFF)] ^ (_local_8 >>> 8));
            _local_7++;
        }

        _local_8 = (_local_8 ^ 0xFFFFFFFF);

        writer1.position = _local_6;
        writer1.writeInt(_local_8);
    }
}
