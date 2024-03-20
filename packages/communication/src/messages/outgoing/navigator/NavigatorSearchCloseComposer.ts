import { IMessageComposer } from '@nitrots/api';

export class NavigatorSearchCloseComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorSearchCloseComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorSearchCloseComposer>;

    constructor(code: string)
    {
        this._data = [code];
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
