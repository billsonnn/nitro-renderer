import { IMessageComposer } from '@nitrots/api';

export class GetTargetedOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetTargetedOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetTargetedOfferComposer>;

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
