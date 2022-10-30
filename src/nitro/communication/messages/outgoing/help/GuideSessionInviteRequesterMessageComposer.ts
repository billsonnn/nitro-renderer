import { IMessageComposer } from '../../../../../api';

export class GuideSessionInviteRequesterMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionInviteRequesterMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionInviteRequesterMessageComposer>;

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
