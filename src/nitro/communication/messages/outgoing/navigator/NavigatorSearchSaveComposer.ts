import { IMessageComposer } from '../../../../../api';

export class NavigatorSearchSaveComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorSearchSaveComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorSearchSaveComposer>;

    constructor(code: string, data: string)
    {
        this._data = [code, data];
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
