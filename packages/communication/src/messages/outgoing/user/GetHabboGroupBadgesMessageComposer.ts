import { IMessageComposer } from '@nitrots/api';

export class GetHabboGroupBadgesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetHabboGroupBadgesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetHabboGroupBadgesMessageComposer>;

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
