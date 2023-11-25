import { IMessageComposer } from '../../../../../api';

export class ChatReviewGuideVoteMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewGuideVoteMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewGuideVoteMessageComposer>;

    constructor(voteState: number)
    {
        this._data = [voteState];
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
