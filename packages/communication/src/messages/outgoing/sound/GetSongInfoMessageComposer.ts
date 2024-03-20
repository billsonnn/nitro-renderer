import { IMessageComposer } from '@nitrots/api';

export class GetSongInfoMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetSongInfoMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetSongInfoMessageComposer>;

    constructor(...args: number[])
    {
        this._data = [args.length].concat(args);
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
