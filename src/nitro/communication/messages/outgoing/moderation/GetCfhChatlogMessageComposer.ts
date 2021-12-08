import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';


export class GetCfhChatlogMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCfhChatlogMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCfhChatlogMessageComposer>;

    constructor(issueId: number)
    {
        this._data = [issueId];
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
