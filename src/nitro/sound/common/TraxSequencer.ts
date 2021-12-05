import { TraxData } from './TraxData';
export class TraxSequencer
{
    private static readonly SAMPLES_PER_SECOND: number = 44100;
    private static readonly BUFFER_LENGTH: number = 0x2000;
    private static readonly SAMPLES_BAR_LENGTH: number = 88000;
    private static readonly BAR_LENGTH: number = 88000;
    private static readonly MIXING_BUFFER: number[] = new Array(this.BUFFER_LENGTH);
    private static readonly INTERPOLATION_BUFFER: number[] = new Array(this.BUFFER_LENGTH);

    private _volume: number;
    //sound
    //soundChannel
    private _traxData: TraxData;
    private _samples: Map<number, any>;
    private _ready: boolean;
    private _songId: number;
    private _playLengthSamples: number = 0;
    private _playHead: number;
    //sequence array
    private _prepared: boolean;
    private _finished: boolean = true;
    private _lengthSamples: number;
    private _latencyMs: number;
    private _fadeInActive: boolean;
    private _fadeOutActive: boolean;
    private _fadeInLengthSamples: number;
    private _fadeOutLengthSamples: number;
    private _fadeInSampleCounter: number;
    private _fadeOutSampleCounter: number;
    //fadeOutStopTimer
    //stopTimer
    private _useCutMode: boolean;
    private _expectedStreamPosition: number = 0;
    private _bufferUnderRunCount: number = 0;

    constructor(songId: number, traxData: TraxData, samples: any)
    {
        this._latencyMs = 30;
        //set events
        this._songId = songId;
        this._volume = 1;
        //set sound new Sound()
        //set soundchannel null
        this._samples = new Map();
        this._traxData = traxData;
        this._ready = true;
        this._playHead = 0;
        //set sequence []
        this._prepared = false;
        this._lengthSamples = 0;
        this._finished = false;
        this._fadeInActive = false;
        this._fadeOutActive = false;
        this._fadeInLengthSamples = 0;
        this._fadeOutLengthSamples = 0;
        this._fadeInSampleCounter = 0;
        this._fadeOutSampleCounter = 0;
    }

    public prepare(): boolean
    {
        if(!this._ready) return false;

        if(this._prepared) return true;

        if(this._traxData != null)
        {
            this._useCutMode = false;

            if(this._traxData.hasMetaData)
            {
                this._useCutMode = this._traxData.metaCutMode;
            }

            if(this._useCutMode)
            // eslint-disable-next-line no-empty
            {

            }
        }
    }

    public prepareSequence(): void
    {
        for(const channel of this._traxData.channels)
        {
            for(const item of channel.items)
            {
                const sample = this._samples.get(item.id);
            }
        }
    }

    public get position(): number
    {
        return this._playHead / TraxSequencer.SAMPLES_PER_SECOND;
    }

    private set position(value: number)
    {
        this._playHead = value * TraxSequencer.SAMPLES_PER_SECOND;
    }

    public get volume(): number
    {
        return this._volume;
    }

    public set volume(value: number)
    {
        this._volume = value;

        //soundTransform for channel
    }

    public get ready(): boolean
    {
        return this._ready;
    }

    public set ready(value: boolean)
    {
        this._ready = value;
    }

    public get finished(): boolean
    {
        return this._finished;
    }

    public set finished(value: boolean)
    {
        this._finished = value;
    }

    public get fadeOutSeconds(): number
    {
        return this._fadeOutLengthSamples / TraxSequencer.SAMPLES_PER_SECOND;
    }

    public set fadeOutSeconds(value: number)
    {
        this._fadeOutLengthSamples = value * TraxSequencer.SAMPLES_PER_SECOND;
    }

    public get fadeInSetconds(): number
    {
        return this._fadeInLengthSamples / TraxSequencer.SAMPLES_PER_SECOND;
    }

    public set fadeInSeconds(value: number)
    {
        this._fadeInLengthSamples = value * TraxSequencer.SAMPLES_PER_SECOND;
    }

    public get traxData(): TraxData
    {
        return this._traxData;
    }

    public get length(): number
    {
        return this._lengthSamples / TraxSequencer.SAMPLES_PER_SECOND;
    }
}
