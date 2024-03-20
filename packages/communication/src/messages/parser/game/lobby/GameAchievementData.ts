export class GameAchievementData
{
    private _gameTypeId:number;
    private _achievementId:number;
    private _achievementName:string;
    private _levels:number;

    constructor(gameTypeId:number, achievementId:number, achievementName:string, levels:number)
    {
        this._gameTypeId = gameTypeId;
        this._achievementId = achievementId;
        this._achievementName = achievementName;
        this._levels = levels;
    }

    public get gameTypeId():number
    {
        return this._gameTypeId;
    }

    public get achievementId():number
    {
        return this._achievementId;
    }

    public get achievementName():string
    {
        return this._achievementName;
    }

    public get levels():number
    {
        return this._levels;
    }
}
