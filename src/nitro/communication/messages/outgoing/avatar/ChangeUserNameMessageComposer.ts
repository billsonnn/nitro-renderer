import { IMessageComposer } from '../../../../../api';

export class ChangeUserNameMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChangeUserNameMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChangeUserNameMessageComposer>;

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
