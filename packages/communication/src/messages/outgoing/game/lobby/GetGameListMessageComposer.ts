import { IMessageComposer } from '@nitrots/api';

export class GetGameListMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetGameListMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetGameListMessageComposer>;

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
