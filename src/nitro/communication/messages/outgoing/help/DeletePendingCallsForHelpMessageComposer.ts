import { IMessageComposer } from '../../../../../api';

export class DeletePendingCallsForHelpMessageComposer implements IMessageComposer<ConstructorParameters<typeof DeletePendingCallsForHelpMessageComposer>>
{
    private _data: ConstructorParameters<typeof DeletePendingCallsForHelpMessageComposer>;

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
