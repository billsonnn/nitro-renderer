import { IMessageComposer } from '@nitrots/api';

export class ForwardToACompetitionRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToACompetitionRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToACompetitionRoomMessageComposer>;

    constructor(k: string, _arg_2: number)
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
