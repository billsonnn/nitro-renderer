import { IMessageComposer } from '../../../../../api';

export class GetDirectClubBuyAvailableComposer implements IMessageComposer<ConstructorParameters<typeof GetDirectClubBuyAvailableComposer>>
{
    private _data: ConstructorParameters<typeof GetDirectClubBuyAvailableComposer>;

    constructor(days: number)
    {
        this._data = [days];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        this._data = null;
    }
}
