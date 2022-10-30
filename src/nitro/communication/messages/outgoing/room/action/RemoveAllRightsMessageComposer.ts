import { IMessageComposer } from '../../../../../../api';

export class RemoveAllRightsMessageComposer implements IMessageComposer<ConstructorParameters<typeof RemoveAllRightsMessageComposer>>
{
    private _data: ConstructorParameters<typeof RemoveAllRightsMessageComposer>;

    constructor(roomId: number)
    {
        this._data = [roomId];
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
