import { IMessageComposer } from '../../../../../api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class ModTradingLockMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModTradingLockMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModTradingLockMessageComposer>;

    constructor(userId: number, message: string, numSeconds: number, categoryId: number, issueState: number = -1)
    {
        this._data = [userId, message, numSeconds, categoryId];

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
