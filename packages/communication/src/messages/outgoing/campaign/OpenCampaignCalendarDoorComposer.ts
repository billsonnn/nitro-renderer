import { IMessageComposer } from '@nitrots/api';

export class OpenCampaignCalendarDoorComposer implements IMessageComposer<ConstructorParameters<typeof OpenCampaignCalendarDoorComposer>>
{
    private _data: ConstructorParameters<typeof OpenCampaignCalendarDoorComposer>;

    constructor(k: string, _arg_2: number)
    {
        this._data = [k, _arg_2];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
