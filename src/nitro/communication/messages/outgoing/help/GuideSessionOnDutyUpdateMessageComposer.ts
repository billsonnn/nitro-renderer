import { IMessageComposer } from '../../../../../api';

export class GuideSessionOnDutyUpdateMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionOnDutyUpdateMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionOnDutyUpdateMessageComposer>;

    constructor(onDuty: boolean, hasGuideRequests: boolean, hasHelperRequests: boolean, hasGuardianRequests: boolean)
    {
        this._data = [onDuty, hasGuideRequests, hasHelperRequests, hasGuardianRequests];
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
