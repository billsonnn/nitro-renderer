import { IMessageComposer } from '@nitrots/api';

export class MyRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyRoomsSearchMessageComposer>;

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
