import { IMessageComposer } from '@nitrots/api';

export class GetNowPlayingMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetNowPlayingMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetNowPlayingMessageComposer>;

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
