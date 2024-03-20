import { IMessageComposer } from '@nitrots/api';

export class GetRoomEntryDataMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRoomEntryDataMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRoomEntryDataMessageComposer>;

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
