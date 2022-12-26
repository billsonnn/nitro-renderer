import { IMessageComposer } from '../../../../../api';

export class WhiperGroupComposer implements IMessageComposer<ConstructorParameters<typeof WhiperGroupComposer>>
{
    private _data: ConstructorParameters<typeof WhiperGroupComposer>;

    constructor(name: string)
    {
        this._data = [name];
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
