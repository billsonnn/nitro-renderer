import { IMessageComposer } from '../../../../../api';

export class MakeOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof MakeOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof MakeOfferMessageComposer>;

    constructor(credits: number, itemType: number, itemId: number)
    {
        this._data = [credits, itemType, itemId];
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
