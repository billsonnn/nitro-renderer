import { IMessageComposer } from '../../../../../../api';

export class GetItemDataComposer implements IMessageComposer<ConstructorParameters<typeof GetItemDataComposer>>
{
    private _data: ConstructorParameters<typeof GetItemDataComposer>;

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
