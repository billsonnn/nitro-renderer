export class TalentTrackLevelAchievement
{
    private _id: number;
    private _index: number;
    private _achievementCode: string;
    private _state: number;
    private _progress: number;
    private _achievementProgress: number;

    constructor(id: number, index: number, achievementCode: string, state: number, progress: number, achievementProgress: number)
    {
        this._id = id;
        this._index = index;
        this._achievementCode = achievementCode;
        this._state = state;
        this._progress = progress;
        this._achievementProgress = achievementProgress;
    }

    public get id(): number
    {
        return this._id;
    }

    public get index(): number
    {
        return this._index;
    }

    public get achievementCode(): string
    {
        return this._achievementCode;
    }

    public get state(): number
    {
        return this._state;
    }

    public get progress(): number
    {
        return this._progress;
    }

    public get achievementProgress(): number
    {
        return this._achievementProgress;
    }
}
