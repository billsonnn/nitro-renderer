import { IMessageComposer } from '@nitrots/api';

export class Game2PlayAgainMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2PlayAgainMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2PlayAgainMessageComposer>;

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
