import { IMessageComposer } from '../../../../../api';

export class ForwardToRandomCompetitionRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToRandomCompetitionRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToRandomCompetitionRoomMessageComposer>;

    constructor(goalCode: string)
    {
        this._data = [goalCode];
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
