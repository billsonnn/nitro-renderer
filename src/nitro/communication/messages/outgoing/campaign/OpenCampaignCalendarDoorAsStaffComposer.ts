import { IMessageComposer } from '../../../../../api';

export class OpenCampaignCalendarDoorAsStaffComposer implements IMessageComposer<ConstructorParameters<typeof OpenCampaignCalendarDoorAsStaffComposer>>
{
    private _data: ConstructorParameters<typeof OpenCampaignCalendarDoorAsStaffComposer>;

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
