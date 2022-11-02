import { IMessageComposer } from '../../../../../api';

export class RoomCompetitionInitMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomCompetitionInitMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomCompetitionInitMessageComposer>;

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
