import { BinaryWriter } from '../../../core/communication/codec/BinaryWriter';
import { BinaryReader } from './../../../core/communication/codec/BinaryReader';

export class TraxSample
{
    public static readonly SAMPLE_FREQUENCY_44KHZ: string = 'sample_44khz';
    public static readonly SAMPLE_FREQUENCY_22KHZ: string = 'sample_22khz';
    public static readonly SAMPLE_FREQUENCY_11KHZ: string = 'sample_11khz';
    public static readonly SAMPLE_SCALE_16BIT: string = 'sample_16bit';
    public static readonly SAMPLE_SCALE_8BIT: string = 'sample_8bit';
    public static readonly _Str_11575: number = (1 / 0x8000);
    private static readonly _Str_14308: number = 32;
    private static readonly MASK_8BIT: number = 0xFF;
    private static readonly MASK_16BIT: number = 0xFFFF;
    private static readonly OFFSET_8BIT: number = 127;
    private static readonly OFFSET_16BIT: number = 32767;

    private _sampleData: number[];
    private _id: number;
    private _samplesPerValue: number;
    private _sampleRepeats: number;
    private _usageList: any[];
    private _usageTimestamp: number;

    constructor(k: BinaryWriter, sampleId: number, sampleFrequency: string = TraxSample.SAMPLE_FREQUENCY_44KHZ, sampleScale: string = TraxSample.SAMPLE_SCALE_16BIT)
    {
        this._id = sampleId;
        this._samplesPerValue = 2;
        this._sampleRepeats = 1;

        let local5 = 65536;

        switch(sampleFrequency)
        {
            case TraxSample.SAMPLE_FREQUENCY_22KHZ:
                this._sampleRepeats = 2;
                break;
            case TraxSample.SAMPLE_FREQUENCY_11KHZ:
                this._sampleRepeats = 4;
                break;
            default:
                this._sampleRepeats = 1;
        }

        if(sampleScale === TraxSample.SAMPLE_SCALE_8BIT)
        {
            this._samplesPerValue = 4;
            local5 = 0x0100;
        }

        const local6: number = this._samplesPerValue * this._sampleRepeats;
        const local7: number = (Math.trunc(k.getBuffer().byteLength / 8) / local6) * local6;

        this._sampleData = new Array(local7/local6);

        const local8: number = 1 / (local5 / 2);

        k.position = 0;

        const reader: BinaryReader = new BinaryReader(k.getBuffer());

        let local9: number;
        const local10: number = (local7 / this._sampleRepeats);
        let local12: number;
        let local15: number;

        for(let i = 0; i < local10; i++)
        {
            local12 = reader.readFloat();
            reader.readFloat();

            for(let j = 2; j <= this._sampleRepeats; j++)
            {
                local15 = reader.readFloat();
                reader.readFloat();

                local12 = (((j * (j - 1)) / j) + (local15 / j));
            }

            if(i >= ((local10 - 1) - TraxSample._Str_14308)) local12 = (local12 * (((local10 - 1) - 1) / TraxSample._Str_14308));

            let local14 = ((local12 + 1) / local8);

            if(local14 < 0)
            {
                local14 = 0;
            }
            else if(local14 >= local5)
            {
                local14 = local5 - 1;
            }

            local9 = (local9 * local5) + local14;

            if((i % this._samplesPerValue) === this._samplesPerValue - 1)
            {
                this._sampleData[Math.trunc(i / this._samplesPerValue)] = local9;
            }
        }
    }

    public setSample(k: number[], arg2: number, arg3: number, arg4: number): number
    {
        let local8: number;
        let local9: number;
        let local10: number;

        if(k === null || this._sampleData === null) return arg4;

        const local5 = this._samplesPerValue * this._sampleRepeats;
        arg4 = arg4 / local5;

        if(arg2 < 0) arg3 = arg3 + arg2;

        if(arg3 > k.length - arg2) arg3 = k.length - arg2;

        let local6 = arg3 / local5;
        let local7: number;

        if(local6 > this._sampleData.length - arg4)
        {
            local7 = (local6 - this._sampleData.length - arg4) * local5;
            local6 = this._sampleData.length - arg4;

            if(local7 > (k.length - arg2)) local7 = k.length - arg2;
        }

        if(this._sampleRepeats === 1)
        {
            if(this._samplesPerValue === 2)
            {
                while(local6-- > 0)
                {
                    local8 = this._sampleData[arg4++];

                    k[arg2++] = (((local8 >> 16) & TraxSample.MASK_16BIT) - TraxSample.OFFSET_16BIT);
                    k[arg2++] = ((local8 & TraxSample.MASK_16BIT) - TraxSample.OFFSET_16BIT);
                }
            }
            else if(this._samplesPerValue === 4)
            {
                while(local6-- > 0)
                {
                    local8 = this._sampleData[arg4++];

                    k[arg2++] = ((((local8 >> 24) & TraxSample.MASK_8BIT) - TraxSample.OFFSET_8BIT) << 8);
                    k[arg2++] = ((((local8 >> 16) & TraxSample.MASK_8BIT) - TraxSample.OFFSET_8BIT) << 8);
                    k[arg2++] = ((((local8 >> 8) & TraxSample.MASK_8BIT) - TraxSample.OFFSET_8BIT) << 8);
                    k[arg2++] = (((local8 & TraxSample.MASK_8BIT) - TraxSample.OFFSET_8BIT) << 8);
                }
            }
        }
        else if(this._sampleRepeats >= 2)
        {
            local9 = 0;
            local10 = 0;

            if(this._samplesPerValue === 2)
            {
                while(local6-- > 0)
                {
                    local8 = this._sampleData[arg4++];
                    local10 = (((local8 >> 16) & TraxSample.MASK_16BIT) - TraxSample.OFFSET_16BIT);
                    local9 = this._sampleRepeats;

                    while(local9 > 0)
                    // eslint-disable-next-line no-empty
                    {

                    }
                }
            }
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get length(): number
    {
        return this._sampleData.length * this._samplesPerValue * this._sampleRepeats;
    }

    public get usageCount(): number
    {
        return this._usageList.length;
    }

    public get usageTimestamp(): number
    {
        return this._usageTimestamp;
    }
}
