import { IMessageComposer } from '../../../../../api';

export class GuideSessionRequesterCancelsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionRequesterCancelsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionRequesterCancelsMessageComposer>;

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
