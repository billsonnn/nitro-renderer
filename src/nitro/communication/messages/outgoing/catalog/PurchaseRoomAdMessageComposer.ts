import { IMessageComposer } from '../../../../../api';

export class PurchaseRoomAdMessageComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseRoomAdMessageComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseRoomAdMessageComposer>;

    constructor(pageId: number, offerId: number, flatId: number, name: string, extended: boolean, description: string, categoryId: number)
    {
        this._data = [pageId, offerId, flatId, name, extended, description, categoryId];
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
