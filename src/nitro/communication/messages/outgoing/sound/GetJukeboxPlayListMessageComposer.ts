import { IMessageComposer } from '../../../../../api';

export class GetJukeboxPlayListMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetJukeboxPlayListMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetJukeboxPlayListMessageComposer>;

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
