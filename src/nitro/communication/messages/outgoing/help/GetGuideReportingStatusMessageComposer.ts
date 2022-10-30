import { IMessageComposer } from '../../../../../api';

export class GetGuideReportingStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetGuideReportingStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetGuideReportingStatusMessageComposer>;

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
        return;
    }
}
