import { IMessageComposer } from '@nitrots/api';

export class GetGameStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetGameStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetGameStatusMessageComposer>;

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
