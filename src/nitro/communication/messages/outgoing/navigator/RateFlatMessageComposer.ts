import { IMessageComposer } from '../../../../../api';

export class RateFlatMessageComposer implements IMessageComposer<ConstructorParameters<typeof RateFlatMessageComposer>>
{
    private _data: ConstructorParameters<typeof RateFlatMessageComposer>;

    constructor(flat: number)
    {
        this._data = [flat];
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
