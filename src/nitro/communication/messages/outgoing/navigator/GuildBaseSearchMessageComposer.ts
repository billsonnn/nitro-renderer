import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GuildBaseSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuildBaseSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuildBaseSearchMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
