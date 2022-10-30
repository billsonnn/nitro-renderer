import { IMessageComposer } from '../../../../../api';

export class GetOfficialRoomsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetOfficialRoomsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetOfficialRoomsMessageComposer>;

    constructor(k: number = 0)
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
