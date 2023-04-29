import { IMessageComposer } from '../../../../../api';

export class LagWarningReportMessageComposer implements IMessageComposer<ConstructorParameters<typeof LagWarningReportMessageComposer>>
{
    private _data: ConstructorParameters<typeof LagWarningReportMessageComposer>;

    constructor(warningCount: number)
    {
        this._data = [warningCount];
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
