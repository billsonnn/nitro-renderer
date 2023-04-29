import { IMessageComposer } from '../../../../../api';

export class CompleteDiffieHandshakeMessageComposer implements IMessageComposer<ConstructorParameters<typeof CompleteDiffieHandshakeMessageComposer>>
{
    private _data: ConstructorParameters<typeof CompleteDiffieHandshakeMessageComposer>;

    constructor(publicKey: string)
    {
        this._data = [publicKey];
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
