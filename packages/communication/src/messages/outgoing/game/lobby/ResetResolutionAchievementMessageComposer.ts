import { IMessageComposer } from '@nitrots/api';

export class ResetResolutionAchievementMessageComposer implements IMessageComposer<ConstructorParameters<typeof ResetResolutionAchievementMessageComposer>>
{
    private _data: ConstructorParameters<typeof ResetResolutionAchievementMessageComposer>;

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
