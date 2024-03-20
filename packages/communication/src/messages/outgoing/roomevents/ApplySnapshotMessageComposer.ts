import { IMessageComposer } from '@nitrots/api';

export class ApplySnapshotMessageComposer implements IMessageComposer<ConstructorParameters<typeof ApplySnapshotMessageComposer>>
{
    private _data: ConstructorParameters<typeof ApplySnapshotMessageComposer>;

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
