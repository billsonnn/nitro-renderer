import { IMessageComposer } from '../../../../../api';

export class StartCampaignMessageComposer implements IMessageComposer<ConstructorParameters<typeof StartCampaignMessageComposer>>
{
    private _data: ConstructorParameters<typeof StartCampaignMessageComposer>;

    constructor(campaignName: string)
    {
        this._data = [campaignName];
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
