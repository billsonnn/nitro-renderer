import { IMessageComposer } from '@nitrots/api';

export class RoomUnitLookComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitLookComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitLookComposer>;

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
