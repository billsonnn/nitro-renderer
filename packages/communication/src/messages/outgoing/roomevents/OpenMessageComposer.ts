import { IMessageComposer } from '@nitrots/api';

export class OpenMessageComposer implements IMessageComposer<ConstructorParameters<typeof OpenMessageComposer>>
{
    private _data: ConstructorParameters<typeof OpenMessageComposer>;

    constructor(id: number)
    {
        this._data = [id];
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
