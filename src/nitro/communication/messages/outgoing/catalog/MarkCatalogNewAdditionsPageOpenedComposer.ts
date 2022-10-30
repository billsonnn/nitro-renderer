import { IMessageComposer } from '../../../../../api';

export class MarkCatalogNewAdditionsPageOpenedComposer implements IMessageComposer<ConstructorParameters<typeof MarkCatalogNewAdditionsPageOpenedComposer>>
{
    private _data: ConstructorParameters<typeof MarkCatalogNewAdditionsPageOpenedComposer>;

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
