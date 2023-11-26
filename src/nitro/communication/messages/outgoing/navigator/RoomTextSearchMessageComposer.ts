import { IMessageComposer } from '../../../../../api';

export class RoomTextSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomTextSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomTextSearchMessageComposer>;

    constructor(search: string)
    {
        this._data = [search];
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
