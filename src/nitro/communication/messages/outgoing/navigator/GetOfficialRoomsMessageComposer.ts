import { IMessageComposer } from '../../../../../api';

export class GetOfficialRoomsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetOfficialRoomsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetOfficialRoomsMessageComposer>;

    constructor(adIndex: number = 0)
    {
        this._data = [adIndex];
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
