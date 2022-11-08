
export class SongStartRequestData
{
    private _songId: number;
    private _startPos: number;
    private _playLength: number;
    private _playRequestTime: number;
    private _fadeInSeconds: number;
    private _fadeOutSeconds: number;

    constructor(songId: number, startPos: number, playLength: number, fadeInSeconds: number, fadeOutSeconds: number)
    {
        this._songId = songId;
        this._startPos = startPos;
        this._playLength = playLength;
        this._fadeInSeconds = fadeInSeconds;
        this._fadeOutSeconds = fadeOutSeconds;
        this._playRequestTime = Date.now();
    }

    public get songId(): number
    {
        return this._songId;
    }

    public get startPos(): number
    {
        if(this._startPos < 0) return 0;

        return this._startPos + ((Date.now() - this._playRequestTime) / 1000);
    }

    public get playLength(): number
    {
        return this._playLength;
    }

    public get playRequestTime(): number
    {
        return this._playRequestTime;
    }

    public get fadeInSeconds(): number
    {
        return this._fadeInSeconds;
    }

    public get fadeOutSeconds(): number
    {
        return this._fadeOutSeconds;
    }
}
