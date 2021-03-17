import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class NavigatorCategoriesComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorCategoriesComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorCategoriesComposer>;

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