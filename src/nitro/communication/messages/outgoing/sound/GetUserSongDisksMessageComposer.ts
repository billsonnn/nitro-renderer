import { IMessageComposer } from '../../../../../api';

export class GetUserSongDisksMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUserSongDisksMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUserSongDisksMessageComposer>;

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
