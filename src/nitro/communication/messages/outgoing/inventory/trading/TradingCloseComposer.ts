import { IMessageComposer } from '../../../../../../api';

export class TradingCloseComposer implements IMessageComposer<ConstructorParameters<typeof TradingCloseComposer>>
{
    private _data: ConstructorParameters<typeof TradingCloseComposer>;

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
