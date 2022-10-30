import { IMessageComposer } from '../../../../../api';

export class CompetitionRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof CompetitionRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof CompetitionRoomsSearchMessageComposer>;

    constructor(k: number, _arg_2: number)
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
