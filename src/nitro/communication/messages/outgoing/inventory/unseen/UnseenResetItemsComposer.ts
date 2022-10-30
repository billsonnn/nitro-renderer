import { IMessageComposer } from '../../../../../../api';

export class UnseenResetItemsComposer implements IMessageComposer<ConstructorParameters<typeof UnseenResetItemsComposer>>
{
    private _data: ConstructorParameters<typeof UnseenResetItemsComposer>;

    constructor(category: number, ...itemIds: number[])
    {
        this._data = [category, itemIds.length, ...itemIds];
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
