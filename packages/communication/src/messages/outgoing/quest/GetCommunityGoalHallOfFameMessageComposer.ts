import { IMessageComposer } from '@nitrots/api';

export class GetCommunityGoalHallOfFameMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCommunityGoalHallOfFameMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCommunityGoalHallOfFameMessageComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
