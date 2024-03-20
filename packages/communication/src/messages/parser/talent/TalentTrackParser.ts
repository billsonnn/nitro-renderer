import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { TalentTrackLevel } from './TalentTrackLevel';
import { TalentTrackRewardProduct } from './TalentTrackRewardProduct';
import { TalentTrackTask } from './TalentTrackTask';

export class TalentTrackParser implements IMessageParser
{
    private _type: string;
    private _levels: TalentTrackLevel[];

    public flush(): boolean
    {
        this._type = null;
        this._levels = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readString();

        this._levels = [];
        const levelsCount = wrapper.readInt();

        for(let i = 0; i < levelsCount; i++)
        {
            const levelId = wrapper.readInt();
            const levelState = wrapper.readInt();

            const levelAchievements: TalentTrackTask[] = [];
            const achievementsCount = wrapper.readInt();

            for(let j = 0; j < achievementsCount; j++)
            {
                const id = wrapper.readInt();
                const index = wrapper.readInt();
                const code = wrapper.readString();
                const state = wrapper.readInt();
                const progress = wrapper.readInt();
                const achievementProgress = wrapper.readInt();

                levelAchievements.push(new TalentTrackTask(id, index, code, state, progress, achievementProgress));
            }

            const levelPerks: string[] = [];
            const perksCount = wrapper.readInt();

            for(let j = 0; j < perksCount; j++) levelPerks.push(wrapper.readString());

            const levelItems: TalentTrackRewardProduct[] = [];
            const itemsCount = wrapper.readInt();

            for(let j = 0; j < itemsCount; j++)
            {
                const name = wrapper.readString();
                const unknownInt = wrapper.readInt();

                levelItems.push(new TalentTrackRewardProduct(name, unknownInt));
            }

            this._levels.push(new TalentTrackLevel(levelId, levelState, levelAchievements, levelPerks, levelItems));
        }

        return true;
    }

    public get type(): string
    {
        return this._type;
    }

    public get levels(): TalentTrackLevel[]
    {
        return this._levels;
    }
}
