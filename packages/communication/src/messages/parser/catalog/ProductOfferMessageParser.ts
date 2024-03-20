import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { CatalogPageMessageOfferData } from './CatalogPageMessageOfferData';

export class ProductOfferMessageParser implements IMessageParser
{
    private _offer: CatalogPageMessageOfferData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new CatalogPageMessageOfferData(wrapper);

        return true;
    }

    public get offer(): CatalogPageMessageOfferData
    {
        return this._offer;
    }
}
