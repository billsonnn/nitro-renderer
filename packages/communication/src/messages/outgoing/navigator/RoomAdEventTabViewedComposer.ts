import { IMessageComposer } from '@nitrots/api';

export class RoomAdEventTabViewedComposer implements IMessageComposer<ConstructorParameters<typeof RoomAdEventTabViewedComposer>>
{
    private _data: ConstructorParameters<typeof RoomAdEventTabViewedComposer>;

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
