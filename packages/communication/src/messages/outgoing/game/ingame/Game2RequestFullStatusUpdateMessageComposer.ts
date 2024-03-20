import { IMessageComposer } from '@nitrots/api';

export class Game2RequestFullStatusUpdateMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2RequestFullStatusUpdateMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2RequestFullStatusUpdateMessageComposer>;

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
