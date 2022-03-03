import { TalentTrackRewardProduct } from './TalentTrackRewardProduct';
import { TalentTrackTask } from './TalentTrackTask';

export class TalentTrackLevel
{
    private _level: number;
    private _state: number;
    private _tasks: TalentTrackTask[];
    private _rewardPerks: string[];
    private _rewardProducts: TalentTrackRewardProduct[];

    constructor(level: number, state: number, achievements: TalentTrackTask[], perks: string[], items: TalentTrackRewardProduct[])
    {
        this._level = level;
        this._state = state;
        this._tasks = achievements;
        this._rewardPerks = perks;
        this._rewardProducts = items;
    }

    public get level(): number
    {
        return this._level;
    }

    public get state(): number
    {
        return this._state;
    }

    public get tasks(): TalentTrackTask[]
    {
        return this._tasks;
    }

    public get perks(): string[]
    {
        return this._rewardPerks;
    }

    public get items(): TalentTrackRewardProduct[]
    {
        return this._rewardProducts;
    }
}
