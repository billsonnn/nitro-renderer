import { IMessageComposer } from '@nitrots/api';

export class GuideSessionResolvedMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionResolvedMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionResolvedMessageComposer>;

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
