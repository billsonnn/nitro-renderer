import { IMessageComposer } from '@nitrots/api';

export class GetThreadsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetThreadsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetThreadsMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number)
    {
        this._data = [k, _arg_2, _arg_3];
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
