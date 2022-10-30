import { IMessageComposer } from '../../../../../api';

export class MyRoomRightsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyRoomRightsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyRoomRightsSearchMessageComposer>;

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
