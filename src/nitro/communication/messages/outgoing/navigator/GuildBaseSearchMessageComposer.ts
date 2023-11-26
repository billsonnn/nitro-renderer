import { IMessageComposer } from '../../../../../api';

export class GuildBaseSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuildBaseSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuildBaseSearchMessageComposer>;

    constructor(adIndex: number)
    {
        this._data = [adIndex];
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
