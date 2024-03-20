import { IMessageComposer } from '@nitrots/api';

export class ChangeEmailComposer implements IMessageComposer<ConstructorParameters<typeof ChangeEmailComposer>>
{
    private _data: ConstructorParameters<typeof ChangeEmailComposer>;

    constructor(newEmail: string)
    {
        this._data = [newEmail];
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
