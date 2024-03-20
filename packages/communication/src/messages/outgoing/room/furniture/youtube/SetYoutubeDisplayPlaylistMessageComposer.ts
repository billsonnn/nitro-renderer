import { IMessageComposer } from '@nitrots/api';

export class SetYoutubeDisplayPlaylistMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetYoutubeDisplayPlaylistMessageComposer>>
{
    private _data: ConstructorParameters<typeof SetYoutubeDisplayPlaylistMessageComposer>;

    constructor(k: number, _arg_2: string)
    {
        this._data = [k, _arg_2];
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
