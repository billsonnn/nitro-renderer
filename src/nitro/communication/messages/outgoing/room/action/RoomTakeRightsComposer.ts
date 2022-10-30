import { IMessageComposer } from '../../../../../../api';

export class RoomTakeRightsComposer implements IMessageComposer<ConstructorParameters<typeof RoomTakeRightsComposer>>
{
    private _data: ConstructorParameters<typeof RoomTakeRightsComposer>;

    constructor(...userIds: number[])
    {
        this._data = [userIds.length, ...userIds];
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
