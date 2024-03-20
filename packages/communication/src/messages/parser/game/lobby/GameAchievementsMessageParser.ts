import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { GameAchievementData } from './GameAchievementData';

export class GameAchievementsMessageParser implements IMessageParser
{
    private _achievements:GameAchievementData[];

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._achievements = [];
        const count = wrapper.readInt();
        let _local_3 = 0;
        while(_local_3 < count)
        {
            const gameTypeId = wrapper.readInt();
            const achievementCount = wrapper.readInt();
            let _local_6 = 0;
            while(_local_6 < achievementCount)
            {
                const achievementId = wrapper.readInt();
                const achievementName = wrapper.readString();
                const levels = wrapper.readInt();
                this._achievements.push(new GameAchievementData(gameTypeId, achievementId, achievementName, levels));
                _local_6++;
            }
            _local_3++;
        }

        return true;
    }

    public get achievements():GameAchievementData[]
    {
        return this._achievements;
    }
}
