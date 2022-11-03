import { IMessageComposer } from '../../../../../../api';

export class Game2CheckGameDirectoryStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2CheckGameDirectoryStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2CheckGameDirectoryStatusMessageComposer>;

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
