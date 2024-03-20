import { IMessageComposer } from '@nitrots/api';

export class GetIgnoredUsersComposer implements IMessageComposer<ConstructorParameters<typeof GetIgnoredUsersComposer>>
{
    private _data: ConstructorParameters<typeof GetIgnoredUsersComposer>;

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
