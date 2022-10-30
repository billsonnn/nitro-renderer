import { IMessageComposer } from '../../../../../api';

export class PostMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof PostMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof PostMessageMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: string, _arg_4: string)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4];
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
