import { IMessageComposer } from '../../../../../api';

export class GetCommunityGoalHallOfFameMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCommunityGoalHallOfFameMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCommunityGoalHallOfFameMessageComposer>;

    constructor(code: string)
    {
        this._data = [code];
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
