import { IMessageDataWrapper } from '../../../../../api';

export class PrizeData
{
    private _communityGoalId: number;
    private _communityGoalCode: string;
    private _userRank: number;
    private _rewardCode: string;
    private _badge: boolean;
    private _localizedName: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._communityGoalId = wrapper.readInt();
        this._communityGoalCode = wrapper.readString();
        this._userRank = wrapper.readInt();
        this._rewardCode = wrapper.readString();
        this._badge = wrapper.readBoolean();
        this._localizedName = wrapper.readString();
    }

    public get communityGoalId(): number
    {
        return this._communityGoalId;
    }

    public get communityGoalCode(): string
    {
        return this._communityGoalCode;
    }

    public get userRank(): number
    {
        return this._userRank;
    }

    public get rewardCode(): string
    {
        return this._rewardCode;
    }

    public get badge(): boolean
    {
        return this._badge;
    }

    public get localizedName(): string
    {
        return this._localizedName;
    }
}
