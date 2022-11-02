import { IMessageComposer } from '../../../../../api';

export class DisconnectMessageComposer implements IMessageComposer<ConstructorParameters<typeof DisconnectMessageComposer>>
{
    private _data: ConstructorParameters<typeof DisconnectMessageComposer>;

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
