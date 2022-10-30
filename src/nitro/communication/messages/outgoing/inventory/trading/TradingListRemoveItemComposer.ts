import { IMessageComposer } from '../../../../../../api';

export class TradingListItemRemoveComposer implements IMessageComposer<ConstructorParameters<typeof TradingListItemRemoveComposer>>
{
    private _data: ConstructorParameters<typeof TradingListItemRemoveComposer>;

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
