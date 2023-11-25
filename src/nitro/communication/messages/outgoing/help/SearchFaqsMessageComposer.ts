import { IMessageComposer } from '../../../../../api';

export class SearchFaqsMessageComposer implements IMessageComposer<ConstructorParameters<typeof SearchFaqsMessageComposer>>
{
    private _data: ConstructorParameters<typeof SearchFaqsMessageComposer>;

    constructor(search: string)
    {
        this._data = [search];
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
