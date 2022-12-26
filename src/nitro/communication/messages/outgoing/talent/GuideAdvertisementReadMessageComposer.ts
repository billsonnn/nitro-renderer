import { IMessageComposer } from '../../../../../api';

export class GuideAdvertisementReadMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideAdvertisementReadMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideAdvertisementReadMessageComposer>;

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
