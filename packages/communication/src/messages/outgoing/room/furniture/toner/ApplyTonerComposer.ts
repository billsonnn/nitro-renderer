import { IMessageComposer } from '@nitrots/api';

export class ApplyTonerComposer implements IMessageComposer<ConstructorParameters<typeof ApplyTonerComposer>>
{
    private _data: ConstructorParameters<typeof ApplyTonerComposer>;

    constructor(k: number, arg2: number, arg3: number, arg4: number)
    {
        this._data = [k, arg2, arg3, arg4];
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
