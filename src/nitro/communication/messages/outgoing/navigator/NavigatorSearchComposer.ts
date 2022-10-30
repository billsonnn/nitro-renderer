import { IMessageComposer } from '../../../../../api';

export class NavigatorSearchComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorSearchComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorSearchComposer>;

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
