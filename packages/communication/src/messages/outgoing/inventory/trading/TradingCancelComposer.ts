import { IMessageComposer } from '@nitrots/api';

export class TradingCancelComposer implements IMessageComposer<ConstructorParameters<typeof TradingCancelComposer>>
{
    private _data: ConstructorParameters<typeof TradingCancelComposer>;

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
