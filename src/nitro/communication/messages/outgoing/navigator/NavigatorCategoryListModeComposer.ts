import { IMessageComposer } from '../../../../../api';

export class NavigatorCategoryListModeComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorCategoryListModeComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorCategoryListModeComposer>;

    constructor(category: string, listmode: number)
    {
        this._data = [category, listmode];
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
