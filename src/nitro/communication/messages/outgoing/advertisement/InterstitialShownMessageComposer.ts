import { IMessageComposer } from '../../../../../api';

export class InterstitialShownMessageComposer implements IMessageComposer<ConstructorParameters<typeof InterstitialShownMessageComposer>>
{
    private _data: ConstructorParameters<typeof InterstitialShownMessageComposer>;

    constructor()
    {
        this._data = [];
    }

    public dispose(): void
    {
        return;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
