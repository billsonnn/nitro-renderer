import { IMessageComposer } from '../../../../../api';

export class UniqueIDMessageComposer implements IMessageComposer<ConstructorParameters<typeof UniqueIDMessageComposer>>
{
    private _data: ConstructorParameters<typeof UniqueIDMessageComposer>;

    constructor(machineId: string, fingerprint: string, flashVersion: string)
    {
        this._data = [machineId, fingerprint, flashVersion];
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
