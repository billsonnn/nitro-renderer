import { IMessageComposer } from '../../../../../api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class DefaultSanctionMessageComposer implements IMessageComposer<ConstructorParameters<typeof DefaultSanctionMessageComposer>>
{
    private _data: ConstructorParameters<typeof DefaultSanctionMessageComposer>;

    constructor(userId: number, selectedTopic: number, message: string, issueState: number = -1)
    {
        this._data = [userId, selectedTopic, message];
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
