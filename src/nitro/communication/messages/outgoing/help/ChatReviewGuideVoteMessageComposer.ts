import { IMessageComposer } from '../../../../../api';

export class ChatReviewGuideVoteMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewGuideVoteMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewGuideVoteMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
