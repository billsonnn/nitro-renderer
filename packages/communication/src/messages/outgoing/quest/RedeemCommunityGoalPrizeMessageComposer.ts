import { IMessageComposer } from '@nitrots/api';

export class RedeemCommunityGoalPrizeMessageComposer implements IMessageComposer<ConstructorParameters<typeof RedeemCommunityGoalPrizeMessageComposer>>
{
    private _data: ConstructorParameters<typeof RedeemCommunityGoalPrizeMessageComposer>;

    constructor(communityGoalId: number)
    {
        this._data = [communityGoalId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
