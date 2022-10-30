import { IMessageComposer } from '../../../../../api';

export class GetRoomVisitsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRoomVisitsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRoomVisitsMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
