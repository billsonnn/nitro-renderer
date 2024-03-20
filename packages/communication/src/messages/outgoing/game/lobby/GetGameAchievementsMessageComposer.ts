import { IMessageComposer } from '@nitrots/api';

export class GetGameAchievementsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetGameAchievementsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetGameAchievementsMessageComposer>;

    constructor()
    {
        this._data = [ ];
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
