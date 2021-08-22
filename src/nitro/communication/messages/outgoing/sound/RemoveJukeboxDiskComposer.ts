import { IMessageComposer } from '../../../../../core';

export class RemoveJukeboxDiskComposer implements IMessageComposer<ConstructorParameters<typeof RemoveJukeboxDiskComposer>>
{
    private _data: ConstructorParameters<typeof RemoveJukeboxDiskComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
