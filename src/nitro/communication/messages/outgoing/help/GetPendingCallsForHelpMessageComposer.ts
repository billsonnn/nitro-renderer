import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetPendingCallsForHelpMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetPendingCallsForHelpMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetPendingCallsForHelpMessageComposer>;

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
