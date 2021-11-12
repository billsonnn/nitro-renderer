export class TalentTrackTask
{
    private _id: number;
    private _requiredLevel: number;
    private _badgeCode: string;
    private _state: number;
    private _currentScore: number;
    private _totalScore: number;

    constructor(id: number, requiredLevel: number, badgeCode: string, state: number, currentScore: number, totalScore: number)
    {
        this._id = id;
        this._requiredLevel = requiredLevel;
        this._badgeCode = badgeCode;
        this._state = state;
        this._currentScore = currentScore;
        this._totalScore = totalScore;
    }

    public get id(): number
    {
        return this._id;
    }

    public get requiredLevel(): number
    {
        return this._requiredLevel;
    }

    public get badgeCode(): string
    {
        return this._badgeCode;
    }

    public get state(): number
    {
        return this._state;
    }

    public get currentScore(): number
    {
        return this._currentScore;
    }

    public get totalScore(): number
    {
        return this._totalScore;
    }
}
