import { IMessageComposer } from '../../../../../../api';

export class Game2GetAccountGameStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2GetAccountGameStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2GetAccountGameStatusMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
