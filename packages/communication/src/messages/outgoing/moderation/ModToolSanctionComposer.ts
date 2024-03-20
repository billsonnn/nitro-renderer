import { IMessageComposer } from '@nitrots/api';

export class ModToolSanctionComposer implements IMessageComposer<ConstructorParameters<typeof ModToolSanctionComposer>>
{
    private _data: ConstructorParameters<typeof ModToolSanctionComposer>;

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
