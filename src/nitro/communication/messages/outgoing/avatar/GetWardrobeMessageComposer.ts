import { IMessageComposer } from '../../../../../api';

export class GetWardrobeMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetWardrobeMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetWardrobeMessageComposer>;

    constructor(pageId: number = 0)
    {
        this._data = [pageId];
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
