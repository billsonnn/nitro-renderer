export class ChatlineData
{
    private readonly _timestamp: string;
    private readonly _habboId: number;
    private readonly _username: string;
    private readonly _message: string;
    private readonly _hasHighlighting: boolean;

    constructor(timestamp: string, habboId: number, username: string, message: string, hasHighlighting: boolean)
    {
        this._timestamp = timestamp;
        this._habboId = habboId;
        this._username = username;
        this._message = message;
        this._hasHighlighting = hasHighlighting;
    }

    public get timestamp(): string
    {
        return this._timestamp;
    }

    public get userId(): number
    {
        return this._habboId;
    }

    public get userName(): string
    {
        return this._username;
    }

    public get message(): string
    {
        return this._message;
    }

    public get hasHighlighting(): boolean
    {
        return this._hasHighlighting;
    }
}
