import { IMessageComposer } from '@nitrots/api';

export class CanCreateRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof CanCreateRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof CanCreateRoomMessageComposer>;

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
