import { IMessageComposer } from '../../../../../api';

export class GetThreadsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetThreadsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetThreadsMessageComposer>;

    constructor(mode: number, startIndex: number, pageSize: number)
    {
        this._data = [mode, startIndex, pageSize];
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
