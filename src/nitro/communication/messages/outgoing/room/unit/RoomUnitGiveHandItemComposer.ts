import { IMessageComposer } from '../../../../../../api';

export class RoomUnitGiveHandItemComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitGiveHandItemComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitGiveHandItemComposer>;

    constructor(unitId: number)
    {
        this._data = [unitId];
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
