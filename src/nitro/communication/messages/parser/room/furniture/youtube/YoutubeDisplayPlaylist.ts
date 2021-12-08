export class YoutubeDisplayPlaylist
{
    private _video: string;
    private _title: string;
    private _description: string;

    constructor(k: string, _arg_2: string, _arg_3: string)
    {
        this._video = k;
        this._title = _arg_2;
        this._description = _arg_3;
    }

    public get video():string
    {
        return this._video;
    }

    public get title():string
    {
        return this._title;
    }

    public get description():string
    {
        return this._description;
    }
}
