import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetCommunityGoalProgressMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCommunityGoalProgressMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCommunityGoalProgressMessageComposer>;

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
