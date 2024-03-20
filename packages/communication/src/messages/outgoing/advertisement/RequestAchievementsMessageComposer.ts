import { IMessageComposer } from '@nitrots/api';

export class RequestAchievementsMessageComposer implements IMessageComposer<ConstructorParameters<typeof RequestAchievementsMessageComposer>>
{
    private _data: ConstructorParameters<typeof RequestAchievementsMessageComposer>;

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
