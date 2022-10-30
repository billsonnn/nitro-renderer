import { IMessageComposer } from '../../../../../../api';

export class TradingConfirmationComposer implements IMessageComposer<ConstructorParameters<typeof TradingConfirmationComposer>>
{
    private _data: ConstructorParameters<typeof TradingConfirmationComposer>;

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
