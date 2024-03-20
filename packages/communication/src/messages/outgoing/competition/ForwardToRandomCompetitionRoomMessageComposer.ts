import { IMessageComposer } from '@nitrots/api';

export class ForwardToRandomCompetitionRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToRandomCompetitionRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToRandomCompetitionRoomMessageComposer>;

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
