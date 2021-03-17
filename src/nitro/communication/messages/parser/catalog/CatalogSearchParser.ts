import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogPageOfferData } from './utils/CatalogPageOfferData';

export class CatalogSearchParser implements IMessageParser
{
    private _offer: CatalogPageOfferData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new CatalogPageOfferData(wrapper);

        return true;
    }

    public get offer(): CatalogPageOfferData
    {
        return this._offer;
    }
}