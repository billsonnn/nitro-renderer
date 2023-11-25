import { IMessageComposer } from '../../../../../api';

export class ForwardToACompetitionRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToACompetitionRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToACompetitionRoomMessageComposer>;

    constructor(goalCode: string, userId: number)
    {
        this._data = [goalCode, userId];
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
