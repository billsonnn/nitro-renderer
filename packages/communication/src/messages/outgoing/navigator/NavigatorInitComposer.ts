import { IMessageComposer } from '@nitrots/api';

export class NavigatorInitComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorInitComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorInitComposer>;

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
