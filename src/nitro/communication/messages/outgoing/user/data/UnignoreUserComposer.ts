import { IMessageComposer } from '../../../../../../api';

export class UnignoreUserComposer implements IMessageComposer<ConstructorParameters<typeof UnignoreUserComposer>>
{
    private _data: ConstructorParameters<typeof UnignoreUserComposer>;

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
