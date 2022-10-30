import { IMessageComposer } from '../../../../../../api';

export class RoomUnitWalkComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitWalkComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitWalkComposer>;

    constructor(x: number, y: number)
    {
        this._data = [x, y];
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
