import { IMessageComposer } from '../../../../../api';

export class AddJukeboxDiskComposer implements IMessageComposer<ConstructorParameters<typeof AddJukeboxDiskComposer>>
{
    private _data: ConstructorParameters<typeof AddJukeboxDiskComposer>;

    constructor(k: number, _arg2: number)
    {
        this._data = [k, _arg2];
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
