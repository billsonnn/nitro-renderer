import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogRequestPetBreedsComposer implements IMessageComposer<ConstructorParameters<typeof CatalogRequestPetBreedsComposer>>
{
    private _data: ConstructorParameters<typeof CatalogRequestPetBreedsComposer>;

    constructor(name: string)
    {
        this._data = [ name ];
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
