import { IMessageComposer } from '@nitrots/api';

export class CallForHelpFromPhotoMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromPhotoMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromPhotoMessageComposer>;

    constructor(extraData: string, roomId: number, reportedUserId: number, topicId: number, roomObjectId: number)
    {
        this._data = [extraData, roomId, reportedUserId, topicId, roomObjectId];
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
