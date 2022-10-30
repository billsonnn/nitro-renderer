import { IMessageComposer } from '../../../../../../api';

export class TradingListAddItemsComposer implements IMessageComposer<ConstructorParameters<typeof TradingListAddItemsComposer>>
{
    private _data: ConstructorParameters<typeof TradingListAddItemsComposer>;

    constructor(...itemIds: number[])
    {
        this._data = [itemIds.length, ...itemIds];
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
