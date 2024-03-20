import { IMessageComposer } from '@nitrots/api';

export class Game2LoadStageReadyMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2LoadStageReadyMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2LoadStageReadyMessageComposer>;

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
