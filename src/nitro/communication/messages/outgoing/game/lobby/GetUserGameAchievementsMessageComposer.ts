import { IMessageComposer } from '../../../../../../api';

export class GetUserGameAchievementsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUserGameAchievementsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUserGameAchievementsMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
