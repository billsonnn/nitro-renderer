import { IMessageComposer } from '../../../../../api';

export class PopularRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof PopularRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof PopularRoomsSearchMessageComposer>;

    constructor(k: string, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
