import { IMessageComposer } from '../../../../../api';

export class PopularRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof PopularRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof PopularRoomsSearchMessageComposer>;

    constructor(search: string, adIndex: number)
    {
        this._data = [search, adIndex];
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
