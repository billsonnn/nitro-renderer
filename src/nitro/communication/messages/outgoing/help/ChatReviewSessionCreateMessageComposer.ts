import { IMessageComposer } from '../../../../../api';

export class ChatReviewSessionCreateMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewSessionCreateMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewSessionCreateMessageComposer>;

    constructor(userId: number, roomId: number)
    {
        this._data = [userId, roomId];
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
