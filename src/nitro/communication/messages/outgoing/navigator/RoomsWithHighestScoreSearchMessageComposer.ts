import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class RoomsWithHighestScoreSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomsWithHighestScoreSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomsWithHighestScoreSearchMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
