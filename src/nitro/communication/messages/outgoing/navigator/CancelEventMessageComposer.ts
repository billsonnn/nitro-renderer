import { IMessageComposer } from '../../../../../api';

export class CancelEventMessageComposer implements IMessageComposer<ConstructorParameters<typeof CancelEventMessageComposer>>
{
    private _data: ConstructorParameters<typeof CancelEventMessageComposer>;

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
