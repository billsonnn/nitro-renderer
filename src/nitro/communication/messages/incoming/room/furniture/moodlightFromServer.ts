export class MoodlightFromServer
{
    private readonly _id: number         = 0;
    private _type: number       = 0;
    private _color: number      = 0;
    private _intensity: number   = 0;
    private  _isParsed: boolean = false;
    private _htmlColor: string = null;

    constructor(k: number)
    {
        this._id = k;
    }

    public parsed(): void
    {
        this._isParsed = true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): number
    {
        return this._type;
    }

    public set type(k: number)
    {
        if(!this._isParsed) this._type = k;
    }

    public get color(): number
    {
        return this._color;
    }

    public set color(k: number)
    {
        if(!this._isParsed) this._color = k;
    }

    public get intensity(): number
    {
        return this._intensity;
    }

    public set intensity(k: number)
    {
        if(!this._isParsed) this._intensity = k;
    }

    public set htmlColor(color: string)
    {
        this._htmlColor = color;
    }

    public get htmlColor(): string
    {
        return this._htmlColor;
    }
}
