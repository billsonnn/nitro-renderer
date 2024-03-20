import { IMessageComposer } from '@nitrots/api';

export class ChatReviewGuideDecidesOnOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewGuideDecidesOnOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewGuideDecidesOnOfferMessageComposer>;

    constructor(k: boolean)
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
