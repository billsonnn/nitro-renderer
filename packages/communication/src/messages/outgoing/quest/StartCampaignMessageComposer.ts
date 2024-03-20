import { IMessageComposer } from '@nitrots/api';

export class StartCampaignMessageComposer implements IMessageComposer<ConstructorParameters<typeof StartCampaignMessageComposer>>
{
    private _data: ConstructorParameters<typeof StartCampaignMessageComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
