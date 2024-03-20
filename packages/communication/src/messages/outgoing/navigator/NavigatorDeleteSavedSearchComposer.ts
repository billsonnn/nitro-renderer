import { IMessageComposer } from '@nitrots/api';

export class NavigatorDeleteSavedSearchComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorDeleteSavedSearchComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorDeleteSavedSearchComposer>;

    constructor(searchId: number)
    {
        this._data = [searchId];
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
