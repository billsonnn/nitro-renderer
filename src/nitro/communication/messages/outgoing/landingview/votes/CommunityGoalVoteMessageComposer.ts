import { IMessageComposer } from '../../../../../../api';

export class CommunityGoalVoteMessageComposer implements IMessageComposer<ConstructorParameters<typeof CommunityGoalVoteMessageComposer>>
{
    private _data: ConstructorParameters<typeof CommunityGoalVoteMessageComposer>;

    constructor(voteOption: number)
    {
        this._data = [voteOption];
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
