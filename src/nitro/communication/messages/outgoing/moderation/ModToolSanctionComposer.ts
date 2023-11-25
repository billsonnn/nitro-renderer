import { IMessageComposer } from '../../../../../api';

export class ModToolSanctionComposer implements IMessageComposer<ConstructorParameters<typeof ModToolSanctionComposer>>
{
    private _data: ConstructorParameters<typeof ModToolSanctionComposer>;

    constructor(issueId: number, userId: number, sanctionId: number)
    {
        this._data = [issueId, userId, sanctionId];
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
