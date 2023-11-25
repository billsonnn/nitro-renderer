import { IMessageComposer } from '../../../../../api';

export class ChatReviewGuideDecidesOnOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewGuideDecidesOnOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewGuideDecidesOnOfferMessageComposer>;

    constructor(hasAccepted: boolean)
    {
        this._data = [hasAccepted];
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
