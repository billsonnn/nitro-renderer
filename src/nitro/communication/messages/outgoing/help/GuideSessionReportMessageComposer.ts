import { IMessageComposer } from '../../../../../api';

export class GuideSessionReportMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionReportMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionReportMessageComposer>;

    constructor(message: string)
    {
        this._data = [message];
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
