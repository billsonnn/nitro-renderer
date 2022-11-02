import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { ClubOfferData } from './ClubOfferData';

export class HabboClubOffersMessageParser implements IMessageParser
{
    private _offers: ClubOfferData[];

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
            this._offers.push(new ClubOfferData(wrapper));

            totalOffers--;
        }

        return true;
    }

    public get offers(): ClubOfferData[]
    {
        return this._offers;
    }
}
