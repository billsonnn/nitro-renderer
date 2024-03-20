import { IMessageComposer } from '@nitrots/api';

export class RoomUsersClassificationMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomUsersClassificationMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomUsersClassificationMessageComposer>;

    constructor(userClassType: string)
    {
        this._data = [userClassType];
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
