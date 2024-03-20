import { IMessageComposer } from '@nitrots/api';

export class EditEventMessageComposer implements IMessageComposer<ConstructorParameters<typeof EditEventMessageComposer>>
{
    private _data: ConstructorParameters<typeof EditEventMessageComposer>;

    constructor(k: number, _arg_2: string, _arg_3: string)
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
