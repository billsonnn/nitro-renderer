import { IMessageComposer } from '../../../../../api';

export class RoomsWithHighestScoreSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomsWithHighestScoreSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomsWithHighestScoreSearchMessageComposer>;

    constructor(adIndex: number)
    {
        this._data = [adIndex];
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
