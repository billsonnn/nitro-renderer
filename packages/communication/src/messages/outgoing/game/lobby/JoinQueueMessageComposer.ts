import { IMessageComposer } from '@nitrots/api';

export class JoinQueueMessageComposer implements IMessageComposer<ConstructorParameters<typeof JoinQueueMessageComposer>>
{
    private _data: ConstructorParameters<typeof JoinQueueMessageComposer>;

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
