import { IMessageComposer } from '@nitrots/api';

export class IgnoreUserComposer implements IMessageComposer<ConstructorParameters<typeof IgnoreUserComposer>>
{
    private _data: ConstructorParameters<typeof IgnoreUserComposer>;

    constructor(username: string)
    {
        this._data = [username];
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
