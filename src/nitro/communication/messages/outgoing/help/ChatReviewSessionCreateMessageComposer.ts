import { IMessageComposer } from '../../../../../api';

export class ChatReviewSessionCreateMessageComposer implements IMessageComposer<ConstructorParameters<typeof ChatReviewSessionCreateMessageComposer>>
{
    private _data: ConstructorParameters<typeof ChatReviewSessionCreateMessageComposer>;

    constructor(k: number, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
