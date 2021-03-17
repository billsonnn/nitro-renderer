import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogClubOfferData } from './utils/CatalogClubOfferData';

export class CatalogClubParser implements IMessageParser
{
    private _offers: CatalogClubOfferData[];

    public flush(): boolean
    {
        this._offers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalOffers = wrapper.readInt();

        while(totalOffers > 0)
        {
            this._offers.push(new CatalogClubOfferData(wrapper));

            totalOffers--;
        }

        return true;
    }

    public get offers(): CatalogClubOfferData[]
    {
        return this._offers;
    }
}