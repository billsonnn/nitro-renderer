import { IMessageComposer } from '../../../../../api';

export class NavigatorCategoryListModeComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorCategoryListModeComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorCategoryListModeComposer>;

    constructor(category: string, listMode: number)
    {
        this._data = [category, listMode];
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
