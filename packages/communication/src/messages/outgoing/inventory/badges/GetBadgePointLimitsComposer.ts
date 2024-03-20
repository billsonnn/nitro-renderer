import { IMessageComposer } from '@nitrots/api';

export class GetBadgePointLimitsComposer implements IMessageComposer<ConstructorParameters<typeof GetBadgePointLimitsComposer>>
{
    private _data: ConstructorParameters<typeof GetBadgePointLimitsComposer>;

    constructor()
    {
        this._data = [ ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
