import { IMessageComposer } from '../../../../../api';

export class GetThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetThreadMessageComposer>;

    constructor(k: number, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
