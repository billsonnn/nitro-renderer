import { IMessageComposer } from '../../../../../core';

export class GetSeasonalCalendarDailyOfferComposer implements IMessageComposer<ConstructorParameters<typeof GetSeasonalCalendarDailyOfferComposer>>
{
    private _data: ConstructorParameters<typeof GetSeasonalCalendarDailyOfferComposer>;

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
        this._data = null;
    }
}
