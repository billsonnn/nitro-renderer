import { IMessageComposer } from '@nitrots/api';

export class LeaveQueueMessageComposer implements IMessageComposer<ConstructorParameters<typeof LeaveQueueMessageComposer>>
{
    private _data: ConstructorParameters<typeof LeaveQueueMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
