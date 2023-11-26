import { IMessageComposer } from '../../../../../api';

export class CompetitionRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof CompetitionRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof CompetitionRoomsSearchMessageComposer>;

    constructor(goalId: number, pageIndex: number)
    {
        this._data = [goalId, pageIndex];
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
