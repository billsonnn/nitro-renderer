import { IMessageComposer } from '@nitrots/api';

export class GetPromoArticlesComposer implements IMessageComposer<ConstructorParameters<typeof GetPromoArticlesComposer>>
{
    private _data: ConstructorParameters<typeof GetPromoArticlesComposer>;

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
