import { IMessageComposer } from '../../../../../api';

export class RateFlatMessageComposer implements IMessageComposer<ConstructorParameters<typeof RateFlatMessageComposer>>
{
    private _data: ConstructorParameters<typeof RateFlatMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
