import { IMessageComposer } from '../../../../../api';

export class InitDiffieHandshakeMessageComposer implements IMessageComposer<ConstructorParameters<typeof InitDiffieHandshakeMessageComposer>>
{
    private _data: ConstructorParameters<typeof InitDiffieHandshakeMessageComposer>;

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
