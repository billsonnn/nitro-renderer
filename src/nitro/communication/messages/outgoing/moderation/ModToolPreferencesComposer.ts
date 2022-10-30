import { IMessageComposer } from '../../../../../api';

export class ModToolPreferencesComposer implements IMessageComposer<ConstructorParameters<typeof ModToolPreferencesComposer>>
{
    private _data: ConstructorParameters<typeof ModToolPreferencesComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number)
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
