import { IMessageComposer } from '@nitrots/api';

export class GetInterstitialMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetInterstitialMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetInterstitialMessageComposer>;

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
