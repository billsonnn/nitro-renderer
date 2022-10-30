import { IMessageComposer } from '../../../../../../api';

export class TradingOpenComposer implements IMessageComposer<ConstructorParameters<typeof TradingOpenComposer>>
{
    private _data: ConstructorParameters<typeof TradingOpenComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
