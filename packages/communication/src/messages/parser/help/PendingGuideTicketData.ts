export class PendingGuideTicketData
{
    private _type: number;
    private _secondsAgo: number;
    private _isGuide: boolean;
    private _otherPartyName: string;
    private _otherPartyFigure: string;
    private _description: string;
    private _roomName: string;

    constructor(type: number, secondsAgo: number, isGuide: boolean, otherPartyName: string, otherPartyFigure: string, description: string, roomName: string)
    {
        this._type = type;
        this._secondsAgo = secondsAgo;
        this._isGuide = isGuide;
        this._otherPartyName = otherPartyName;
        this._otherPartyFigure = otherPartyFigure;
        this._description = description;
        this._roomName = roomName;
    }

    public get type(): number
    {
        return this._type;
    }

    public set type(value: number)
    {
        this._type = value;
    }

    public get secondsAgo(): number
    {
        return this._secondsAgo;
    }

    public set secondsAgo(value: number)
    {
        this._secondsAgo = value;
    }

    public get isGuide(): boolean
    {
        return this._isGuide;
    }

    public set isGuide(value: boolean)
    {
        this._isGuide = value;
    }

    public get otherPartyName(): string
    {
        return this._otherPartyName;
    }

    public set otherPartyName(value: string)
    {
        this._otherPartyName = value;
    }

    public get otherPartyFigure(): string
    {
        return this._otherPartyFigure;
    }

    public set otherPartyFigure(value: string)
    {
        this._otherPartyFigure = value;
    }

    public get description(): string
    {
        return this._description;
    }

    public set description(value: string)
    {
        this._description = value;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public set roomName(value: string)
    {
        this._roomName = value;
    }
}
