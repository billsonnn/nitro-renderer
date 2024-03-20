import { IMessageComposer } from '@nitrots/api';

export class CheckUserNameMessageComposer implements IMessageComposer<ConstructorParameters<typeof CheckUserNameMessageComposer>>
{
    private _data: ConstructorParameters<typeof CheckUserNameMessageComposer>;

    constructor(name: string)
    {
        this._data = [name];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
