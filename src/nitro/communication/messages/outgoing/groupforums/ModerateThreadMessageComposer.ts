import { IMessageComposer } from '../../../../../api';

export class ModerateThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModerateThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModerateThreadMessageComposer>;

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
