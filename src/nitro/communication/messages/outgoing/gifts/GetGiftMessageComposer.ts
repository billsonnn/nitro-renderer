import { IMessageComposer } from '../../../../../api';

export class GetGiftMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetGiftMessageComposer>>
{
    public static readonly NO_ISSUE_ID = -1;

    private _data: ConstructorParameters<typeof GetGiftMessageComposer>;

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
