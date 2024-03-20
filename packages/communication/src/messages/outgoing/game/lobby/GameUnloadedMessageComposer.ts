import { IMessageComposer } from '@nitrots/api';

export class GameUnloadedMessageComposer implements IMessageComposer<ConstructorParameters<typeof GameUnloadedMessageComposer>>
{
    private _data: ConstructorParameters<typeof GameUnloadedMessageComposer>;

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
