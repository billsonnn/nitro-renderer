import { IMessageComposer } from '../../../../../api';

export class PublishPhotoMessageComposer implements IMessageComposer<ConstructorParameters<typeof PublishPhotoMessageComposer>>
{
    private _data: ConstructorParameters<typeof PublishPhotoMessageComposer>;

    constructor()
    {
        this._data = [];
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
