import { IMessageComposer } from '../../../../../../api';

export class RoomUnitDanceComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitDanceComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitDanceComposer>;

    constructor(danceType: number)
    {
        this._data = [danceType];
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
