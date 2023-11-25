import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromSelfieMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromSelfieMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromSelfieMessageComposer>;

    constructor(shareUrl: string, roomId: number, senderId: number, message: string, roomObjectId: number)
    {
        this._data = [shareUrl, roomId, senderId, message, roomObjectId];
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
