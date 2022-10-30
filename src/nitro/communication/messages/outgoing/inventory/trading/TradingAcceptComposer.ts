import { IMessageComposer } from '../../../../../../api';

export class TradingAcceptComposer implements IMessageComposer<ConstructorParameters<typeof TradingAcceptComposer>>
{
    private _data: ConstructorParameters<typeof TradingAcceptComposer>;

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
