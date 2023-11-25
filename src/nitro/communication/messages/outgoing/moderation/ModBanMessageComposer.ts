import { IMessageComposer } from '../../../../../api';

export class ModBanMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModBanMessageComposer>>
{
    public static readonly NO_ISSUE_ID = -1;

    private _data: ConstructorParameters<typeof ModBanMessageComposer>;

    constructor(userId: number, message: string, categoryId: number, selectedAction: number, isBan100Years: boolean, issueState: number = -1)
    {
        this._data = [userId, message, categoryId, selectedAction, isBan100Years];
        if(issueState != ModBanMessageComposer.NO_ISSUE_ID)
        {
            this._data.push(issueState);
        }
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
