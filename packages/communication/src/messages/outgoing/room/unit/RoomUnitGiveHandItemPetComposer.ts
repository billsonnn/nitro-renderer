import { IMessageComposer } from '@nitrots/api';

export class RoomUnitGiveHandItemPetComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitGiveHandItemPetComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitGiveHandItemPetComposer>;

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
