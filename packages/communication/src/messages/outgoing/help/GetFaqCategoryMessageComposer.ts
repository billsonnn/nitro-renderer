import { IMessageComposer } from '@nitrots/api';

export class GetFaqCategoryMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetFaqCategoryMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetFaqCategoryMessageComposer>;

    constructor(categoryId: number)
    {
        this._data = [categoryId];
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
