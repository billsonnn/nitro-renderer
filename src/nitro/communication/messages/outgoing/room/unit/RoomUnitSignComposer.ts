import { IMessageComposer } from '../../../../../../api';

export class RoomUnitSignComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitSignComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitSignComposer>;

    constructor(signType: number)
    {
        this._data = [signType];
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
