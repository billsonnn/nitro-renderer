import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CatalogPageMessageOfferData } from './CatalogPageMessageOfferData';

export class SeasonalCalendarDailyOfferMessageParser implements IMessageParser
{
    private _pageId: number;
    private _data: CatalogPageMessageOfferData;

    public flush(): boolean
    {
        this._pageId = -1;
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageId = wrapper.readInt();
        this._data = new CatalogPageMessageOfferData(wrapper);

        return true;
    }

    public get pageId(): number
    {
        return this._pageId;
    }

    public get data(): CatalogPageMessageOfferData
    {
        return this._data;
    }
}
