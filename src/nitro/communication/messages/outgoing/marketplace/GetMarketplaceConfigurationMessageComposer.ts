import { IMessageComposer } from '../../../../../api';

export class GetMarketplaceConfigurationMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetMarketplaceConfigurationMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetMarketplaceConfigurationMessageComposer>;

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
        this._data = null;
    }
}
