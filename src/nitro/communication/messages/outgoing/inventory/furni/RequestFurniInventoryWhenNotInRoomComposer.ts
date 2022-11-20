import { IMessageComposer } from '../../../../../../api';

export class RequestFurniInventoryWhenNotInRoomComposer implements IMessageComposer<ConstructorParameters<typeof RequestFurniInventoryWhenNotInRoomComposer>>
{
    private _data: ConstructorParameters<typeof RequestFurniInventoryWhenNotInRoomComposer>;

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
