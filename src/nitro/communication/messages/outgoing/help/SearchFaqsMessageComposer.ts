import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class SearchFaqsMessageComposer implements IMessageComposer<ConstructorParameters<typeof SearchFaqsMessageComposer>>
{
    private _data: ConstructorParameters<typeof SearchFaqsMessageComposer>;

    constructor(k:string)
    {
        this._data = [k];
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
