import { IMessageComposer } from '../../../../../api';

export class CraftComposer implements IMessageComposer<ConstructorParameters<typeof CraftComposer>>
{
    private _data: ConstructorParameters<typeof CraftComposer>;

    constructor(k: number, _arg_2: string)
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
