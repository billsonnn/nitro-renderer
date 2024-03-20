import { IMessageComposer } from '@nitrots/api';

export class RemoveJukeboxDiskComposer implements IMessageComposer<ConstructorParameters<typeof RemoveJukeboxDiskComposer>>
{
    private _data: ConstructorParameters<typeof RemoveJukeboxDiskComposer>;

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
