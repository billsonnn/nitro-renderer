import { IMessageComposer } from '../../../../../../api';

export class TradingListAddItemComposer implements IMessageComposer<ConstructorParameters<typeof TradingListAddItemComposer>>
{
    private _data: ConstructorParameters<typeof TradingListAddItemComposer>;

    constructor(itemId: number)
    {
        this._data = [itemId];
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
