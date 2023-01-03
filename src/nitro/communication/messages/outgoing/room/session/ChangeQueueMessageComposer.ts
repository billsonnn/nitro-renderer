import { IMessageComposer } from '../../../../../../api';

export class ChangeQueueMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChangeQueueMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChangeQueueMessageComposer>;

    constructor(targetQueue: number)
    {
        this._data = [targetQueue];
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
