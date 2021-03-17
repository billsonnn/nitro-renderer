import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogPurchaseData } from './utils/CatalogPurchaseData';

export class CatalogPurchaseParser implements IMessageParser
{
    private _offer: CatalogPurchaseData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new CatalogPurchaseData(wrapper);

        return true;
    }

    public get offer(): CatalogPurchaseData
    {
        return this._offer;
    }
}