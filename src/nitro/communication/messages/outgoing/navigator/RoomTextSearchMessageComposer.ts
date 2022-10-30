import { IMessageComposer } from '../../../../../api';

export class RoomTextSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomTextSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomTextSearchMessageComposer>;

    constructor(k: string)
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
