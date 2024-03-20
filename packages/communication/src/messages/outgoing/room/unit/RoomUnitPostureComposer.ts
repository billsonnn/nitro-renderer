import { IMessageComposer } from '@nitrots/api';

export class RoomUnitPostureComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitPostureComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitPostureComposer>;

    constructor(posture: number)
    {
        this._data = [posture];
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
