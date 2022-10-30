import { IMessageComposer } from '../../../../../api';

export class GetOfficialSongIdMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetOfficialSongIdMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetOfficialSongIdMessageComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
