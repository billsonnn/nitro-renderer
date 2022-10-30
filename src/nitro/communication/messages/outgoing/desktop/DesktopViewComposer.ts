import { IMessageComposer } from '../../../../../api';

export class DesktopViewComposer implements IMessageComposer<ConstructorParameters<typeof DesktopViewComposer>>
{
    private _data: ConstructorParameters<typeof DesktopViewComposer>;

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
