import { TalentTrackRewardPerk, TalentTrackRewardProduct } from '.';
import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class TalentLevelUpMessageParser implements IMessageParser
{
    private _talentTrackName: string;
    private _level: number;
    private _rewardPerks: TalentTrackRewardPerk[];
    private _rewardProducts: TalentTrackRewardProduct[];

    public flush(): boolean
    {
        this._talentTrackName = null;
        this._level = -1;
        this._rewardPerks = [];
        this._rewardProducts = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalRewards = 0;

        this._talentTrackName = wrapper.readString();
        this._level = wrapper.readInt();

        const totalRewardsPerks = wrapper.readInt();

        while(totalRewards < totalRewardsPerks)
        {
            this._rewardPerks.push(new TalentTrackRewardPerk(wrapper));
            totalRewards++;
        }

        const totalRewardsProducts = wrapper.readInt();

        if(totalRewards < totalRewardsProducts)
        {
            for(let i = 0; i < totalRewardsProducts; i++)
            {
                const name = wrapper.readString();
                const vipDays = wrapper.readInt();

                this._rewardProducts.push(new TalentTrackRewardProduct(name, vipDays));
                totalRewards++;
            }
        }

        return true;
    }

    public get talentTrackName(): string
    {
        return this._talentTrackName;
    }

    public get level(): number
    {
        return this._level;
    }

    public get rewardPerks(): TalentTrackRewardPerk[]
    {
        return this._rewardPerks;
    }

    public get rewardProducts(): TalentTrackRewardProduct[]
    {
        return this._rewardProducts;
    }
}
