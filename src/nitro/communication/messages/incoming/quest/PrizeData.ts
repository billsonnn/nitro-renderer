import { IMessageDataWrapper } from '../../../../../api';

export class PrizeData
{
    private _communityGoalId: number;
    private _communityGoalCode: string;
    private _userRank: number;
    private _rewardCode: string;
    private _badge: boolean;
    private _localizedName: string;

    constructor(k: IMessageDataWrapper)
    {
        this._communityGoalId = k.readInt();
        this._communityGoalCode = k.readString();
        this._userRank = k.readInt();
        this._rewardCode = k.readString();
        this._badge = k.readBoolean();
        this._localizedName = k.readString();
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
