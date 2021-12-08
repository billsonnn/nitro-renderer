import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GuideSessionReportMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionReportMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionReportMessageComposer>;

    constructor(k:string)
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
