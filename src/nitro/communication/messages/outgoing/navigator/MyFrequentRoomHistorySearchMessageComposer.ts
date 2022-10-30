import { IMessageComposer } from '../../../../../api';

export class MyFrequentRoomHistorySearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyFrequentRoomHistorySearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyFrequentRoomHistorySearchMessageComposer>;

    constructor()
    {
        this._data = [];
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
