import { IMessageComposer } from '@nitrots/api';

export class GetUnreadForumsCountMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUnreadForumsCountMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUnreadForumsCountMessageComposer>;

    constructor()
    {
        this._data = [];
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
