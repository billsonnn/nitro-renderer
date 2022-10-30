import { IMessageComposer } from '../../../../../../api';

export class TradingUnacceptComposer implements IMessageComposer<ConstructorParameters<typeof TradingUnacceptComposer>>
{
    private _data: ConstructorParameters<typeof TradingUnacceptComposer>;

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
