import { IMessageComposer } from '@nitrots/api';

export class GetCategoriesWithUserCountMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCategoriesWithUserCountMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCategoriesWithUserCountMessageComposer>;

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
