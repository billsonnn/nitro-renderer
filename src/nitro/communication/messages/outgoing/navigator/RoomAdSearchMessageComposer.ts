import { IMessageComposer } from '../../../../../api';

export class RoomAdSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomAdSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomAdSearchMessageComposer>;

    constructor(adIndex: number, searchState: number)
    {
        this._data = [adIndex, searchState];
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
