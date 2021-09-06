import { TalentTrackLevelAchievement } from './TalentTrackLevelAchievement';
import { TalentTrackLevelItem } from './TalentTrackLevelItem';

export class TalentTrackLevel
{
    private _level: number;
    private _state: number;
    private _achievements: TalentTrackLevelAchievement[]
    private _perks: string[];
    private _items: TalentTrackLevelItem[];

    constructor(level: number, state: number, achievements: TalentTrackLevelAchievement[], perks: string[], items: TalentTrackLevelItem[])
    {
        this._level = level;
        this._state = state;
        this._achievements = achievements;
        this._perks = perks;
        this._items = items;
    }

    public get level(): number
    {
        return this._level;
    }

    public get state(): number
    {
        return this._state;
    }

    public get achievements(): TalentTrackLevelAchievement[]
    {
        return this._achievements;
    }

    public get perks(): string[]
    {
        return this._perks;
    }

    public get items(): TalentTrackLevelItem[]
    {
        return this._items;
    }
}
