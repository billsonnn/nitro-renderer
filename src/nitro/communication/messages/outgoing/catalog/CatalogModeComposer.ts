import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogModeComposer implements IMessageComposer<ConstructorParameters<typeof CatalogModeComposer>>
{
    private _data: ConstructorParameters<typeof CatalogModeComposer>;

    constructor(mode: string)
    {
        this._data = [ mode ];
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