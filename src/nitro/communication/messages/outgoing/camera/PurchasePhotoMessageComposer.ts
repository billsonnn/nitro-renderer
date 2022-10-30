import { IMessageComposer } from '../../../../../api';

export class PurchasePhotoMessageComposer implements IMessageComposer<ConstructorParameters<typeof PurchasePhotoMessageComposer>>
{
    private _data: ConstructorParameters<typeof PurchasePhotoMessageComposer>;

    constructor(photoId: string)
    {
        this._data = [photoId];
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
