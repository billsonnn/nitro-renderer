import { IMessageComposer } from '@nitrots/api';

export class GetConcurrentUsersGoalProgressMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetConcurrentUsersGoalProgressMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetConcurrentUsersGoalProgressMessageComposer>;

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
